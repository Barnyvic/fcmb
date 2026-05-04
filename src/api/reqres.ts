import { demoListResponse, demoUserDetail } from './reqresDemoData';

const API_BASE_URL = 'https://reqres.in/api';
const apiKey = import.meta.env.VITE_REQRES_API_KEY as string | undefined;

export type ReqresUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type SupportInfo = {
  url: string;
  text: string;
};

export type UsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqresUser[];
  support: SupportInfo;
};

export type UserDetailResponse = {
  data: ReqresUser;
  support: SupportInfo;
};

export type RegisterPayload = {
  name: string;
  job: string;
};

export type RegisterResponse = RegisterPayload & {
  id: string;
  createdAt: string;
};

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);

  if (!headers.has('Content-Type') && options?.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (apiKey) {
    headers.set('x-api-key', apiKey);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.message || body?.error || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export async function createUser(payload: RegisterPayload): Promise<RegisterResponse> {
  try {
    return await request<RegisterResponse>('/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return {
        ...payload,
        id: String(Math.floor(100 + Math.random() * 900)),
        createdAt: new Date().toISOString(),
      };
    }

    throw error;
  }
}

export async function getUsers(page = 2): Promise<UsersResponse> {
  try {
    return await request<UsersResponse>(`/users?page=${page}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return demoListResponse;
    }

    throw error;
  }
}

export async function getUser(userId: number): Promise<UserDetailResponse> {
  try {
    return await request<UserDetailResponse>(`/users/${userId}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return {
        ...demoUserDetail,
        data: demoListResponse.data.find((user) => user.id === userId) ?? demoUserDetail.data,
      };
    }

    throw error;
  }
}
