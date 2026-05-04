import type { ReqresUser } from '../api/reqres';

export function getFullName(user: ReqresUser) {
  return `${user.first_name} ${user.last_name}`;
}

export function getInitials(user: ReqresUser) {
  return `${user.first_name[0] ?? ''}${user.last_name[0] ?? ''}`.toUpperCase();
}
