import type { ReqresUser } from '../types/reqres';
import { getFullName } from '../utils/user';
import { Avatar } from './Avatar';
import { Button } from './Button';

type UserDetailProps = {
  user?: ReqresUser;
  isLoading?: boolean;
};

export function UserDetail({ user, isLoading = false }: UserDetailProps) {
  if (isLoading) {
    return (
      <section className="grid justify-items-center gap-10 pt-24 max-[1180px]:pt-6 max-[820px]:pb-8" aria-label="Selected user">
        <div className="h-[194px] w-[194px] animate-pulse rounded-full bg-slate-100" />
        <div className="h-6 w-full max-w-80 animate-pulse rounded bg-slate-100" />
        <div className="h-6 w-full max-w-80 animate-pulse rounded bg-slate-100" />
        <div className="h-13 w-full max-w-[380px] animate-pulse rounded bg-slate-100" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="grid justify-items-center gap-10 pt-24 text-[#74727a] max-[1180px]:pt-6 max-[820px]:pb-8" aria-label="Selected user">
        <p>Select a user to view their details.</p>
      </section>
    );
  }

  return (
    <section className="grid justify-items-center gap-10 pt-24 max-[1180px]:pt-6 max-[820px]:pb-8" aria-label={`${getFullName(user)} details`}>
      <Avatar className="h-[min(194px,54vw)] w-[min(194px,54vw)]" src={user.avatar} alt={getFullName(user)} />
      <dl className="grid w-full max-w-[380px] gap-5">
        <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-4">
          <dt className="font-extrabold">Email:</dt>
          <dd className="m-0 min-w-0 break-words">{user.email}</dd>
        </div>
        <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-4">
          <dt className="font-extrabold">First Name:</dt>
          <dd className="m-0 min-w-0 break-words">{user.first_name}</dd>
        </div>
        <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-4">
          <dt className="font-extrabold">Last Name:</dt>
          <dd className="m-0 min-w-0 break-words">{user.last_name}</dd>
        </div>
      </dl>
      <Button className="max-w-[380px]" fullWidth>
        Proceed
      </Button>
    </section>
  );
}
