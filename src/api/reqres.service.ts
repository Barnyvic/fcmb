import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { demoListResponse, demoUserDetail } from './reqresDemoData';
import type { RegisterPayload, RegisterResponse, UserDetailResponse, UsersResponse } from '../types/reqres';

const apiBaseUrl = 'https://reqres.in/api';

@Injectable({ providedIn: 'root' })
export class ReqresService {
  constructor(private readonly http: HttpClient) {}

  createUser(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${apiBaseUrl}/users`, payload, { headers: this.headers() })
      .pipe(catchError((error) => this.handleRegisterError(error, payload)));
  }

  getUsers(page = 2): Observable<UsersResponse> {
    return this.http
      .get<UsersResponse>(`${apiBaseUrl}/users?page=${page}`, { headers: this.headers() })
      .pipe(catchError((error) => this.handleUsersError(error)));
  }

  getUser(userId: number): Observable<UserDetailResponse> {
    return this.http
      .get<UserDetailResponse>(`${apiBaseUrl}/users/${userId}`, { headers: this.headers() })
      .pipe(catchError((error) => this.handleUserError(error, userId)));
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  private handleRegisterError(error: unknown, payload: RegisterPayload): Observable<RegisterResponse> {
    if (this.isMissingApiKey(error)) {
      return of({
        ...payload,
        id: String(Math.floor(100 + Math.random() * 900)),
        createdAt: new Date().toISOString(),
      });
    }

    return throwError(() => this.toError(error));
  }

  private handleUsersError(error: unknown): Observable<UsersResponse> {
    if (this.isMissingApiKey(error)) {
      return of(demoListResponse);
    }

    return throwError(() => this.toError(error));
  }

  private handleUserError(error: unknown, userId: number): Observable<UserDetailResponse> {
    if (this.isMissingApiKey(error)) {
      return of(demoListResponse.data.find((user) => user.id === userId)).pipe(
        map((user) => ({
          ...demoUserDetail,
          data: user ?? demoUserDetail.data,
        })),
      );
    }

    return throwError(() => this.toError(error));
  }

  private isMissingApiKey(error: unknown): boolean {
    return error instanceof HttpErrorResponse && error.status === 401;
  }

  private toError(error: unknown): Error {
    if (error instanceof HttpErrorResponse) {
      const message = error.error?.message || error.error?.error || `Request failed with status ${error.status}`;
      return new Error(message);
    }

    return error instanceof Error ? error : new Error('Something went wrong.');
  }
}
