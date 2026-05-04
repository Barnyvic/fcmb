import type { ReqresUser } from '../api/reqres';
import { getFullName, getInitials } from '../utils/user';

type HeaderProfileProps = {
  user?: ReqresUser;
};

export function HeaderProfile({ user }: HeaderProfileProps) {
  return (
    <div className="header-profile" aria-label="Active profile">
      {user ? <img src={user.avatar} alt={getFullName(user)} /> : <span>{user ? getInitials(user) : 'FC'}</span>}
      <b>Jummie</b>
      <span>{user ? getFullName(user) : 'Kelvin Olanrewaju'}</span>
    </div>
  );
}
