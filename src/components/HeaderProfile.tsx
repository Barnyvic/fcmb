import type { ReqresUser } from '../types/reqres';
import { getFullName, getInitials } from '../utils/user';
import { Avatar } from './Avatar';

type HeaderProfileProps = {
  user?: ReqresUser;
};

export function HeaderProfile({ user }: HeaderProfileProps) {
  return (
    <div className="flex min-h-[62px] max-w-[300px] items-center rounded-full bg-[#faeafd] py-2 pr-5 pl-2.5" aria-label="Active profile">
      {user ? (
        <Avatar src={user.avatar} alt={getFullName(user)} className="mr-2 h-12 w-12" />
      ) : (
        <span className="mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-fcmb-purple text-white">{user ? getInitials(user) : 'FC'}</span>
      )}
      <b className="mr-1 rounded bg-[#ff533d] px-1.5 py-1 text-[13px] text-white">Jummie</b>
      <span className="min-w-0 truncate">{user ? getFullName(user) : 'Kelvin Olanrewaju'}</span>
    </div>
  );
}
