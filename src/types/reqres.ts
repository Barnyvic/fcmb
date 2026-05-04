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
