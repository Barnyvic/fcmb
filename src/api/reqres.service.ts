import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import type {
  RegisterPayload,
  RegisterResponse,
  UserDetailResponse,
  UsersResponse,
} from "../types/reqres";

const apiBaseUrl = "https://reqres.in/api";
const reqresApiKey =
  (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env[
    "REQRES_API_KEY"
  ] ?? "";

@Injectable({ providedIn: "root" })
export class ReqresService {
  constructor(private readonly http: HttpClient) {}

  createUser(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${apiBaseUrl}/users`, payload, {
        headers: this.headers(),
      })
      .pipe(catchError((error) => this.handleRegisterError(error, payload)));
  }

  getUsers(page = 2): Observable<UsersResponse> {
    return this.http
      .get<UsersResponse>(`${apiBaseUrl}/users?page=${page}`, {
        headers: this.headers(),
      })
      .pipe(catchError((error) => this.handleUsersError(error)));
  }

  getUser(userId: number): Observable<UserDetailResponse> {
    return this.http
      .get<UserDetailResponse>(`${apiBaseUrl}/users/${userId}`, {
        headers: this.headers(),
      })
      .pipe(catchError((error) => this.handleUserError(error, userId)));
  }

  private headers(): HttpHeaders {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (reqresApiKey) {
      headers["x-api-key"] = reqresApiKey;
    }

    return new HttpHeaders(headers);
  }

  private handleRegisterError(
    error: unknown,
    payload: RegisterPayload,
  ): Observable<RegisterResponse> {
    void payload;
    return throwError(() => this.toError(error));
  }

  private handleUsersError(error: unknown): Observable<UsersResponse> {
    return throwError(() => this.toError(error));
  }

  private handleUserError(
    error: unknown,
    userId: number,
  ): Observable<UserDetailResponse> {
    void userId;
    return throwError(() => this.toError(error));
  }

  private toError(error: unknown): Error {
    if (error instanceof HttpErrorResponse) {
      const message =
        error.error?.message ||
        error.error?.error ||
        `Request failed with status ${error.status}`;
      return new Error(message);
    }

    return error instanceof Error ? error : new Error("Something went wrong.");
  }
}
