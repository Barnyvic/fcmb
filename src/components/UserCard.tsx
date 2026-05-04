import type { ReqresUser } from '../types/reqres';
import { getFullName } from '../utils/user';
import { Avatar } from './Avatar';
import { cn } from '../utils/cn';

type UserCardProps = {
  user: ReqresUser;
  isSelected: boolean;
  onSelect: (user: ReqresUser) => void;
};

export function UserCard({ user, isSelected, onSelect }: UserCardProps) {
  return (
    <button
      className={cn(
        'grid min-h-[150px] w-full grid-cols-[128px_1px_minmax(0,1fr)] items-center rounded-[3px] border border-transparent bg-[#fbfbfc] px-6 py-[18px] text-left text-[#25232a] transition duration-150 hover:-translate-y-px hover:border-[#efe3f2] hover:shadow-[0_14px_30px_rgba(40,35,48,0.08)] max-[820px]:min-h-[124px] max-[820px]:grid-cols-[76px_minmax(0,1fr)] max-[820px]:p-4',
        isSelected && 'border-[#efe3f2] shadow-[0_14px_30px_rgba(40,35,48,0.08)]',
      )}
      type="button"
      onClick={() => onSelect(user)}
    >
      <Avatar src={user.avatar} alt={getFullName(user)} className="h-[104px] w-[104px] max-[820px]:h-16 max-[820px]:w-16" />
      <span className="h-[94px] w-px bg-[#dddde2] max-[820px]:hidden" />
      <span className="grid min-w-0 gap-3.5 pl-6 max-[820px]:gap-2 max-[820px]:pl-3">
        <span className="grid grid-cols-[112px_minmax(0,1fr)] gap-2 max-[820px]:grid-cols-[minmax(88px,0.45fr)_minmax(0,1fr)] max-[820px]:text-sm">
          <strong className="font-extrabold">Email:</strong>
          <span className="break-words">{user.email}</span>
        </span>
        <span className="grid grid-cols-[112px_minmax(0,1fr)] gap-2 max-[820px]:grid-cols-[minmax(88px,0.45fr)_minmax(0,1fr)] max-[820px]:text-sm">
          <strong className="font-extrabold">First Name:</strong>
          <span className="break-words">{user.first_name}</span>
        </span>
        <span className="grid grid-cols-[112px_minmax(0,1fr)] gap-2 max-[820px]:grid-cols-[minmax(88px,0.45fr)_minmax(0,1fr)] max-[820px]:text-sm">
          <strong className="font-extrabold">Last Name:</strong>
          <span className="break-words">{user.last_name}</span>
        </span>
      </span>
    </button>
  );
}
