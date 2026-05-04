import type { ReqresUser } from '../api/reqres';
import { getFullName } from '../utils/user';
import { Button } from './Button';

type UserDetailProps = {
  user?: ReqresUser;
  isLoading?: boolean;
};

export function UserDetail({ user, isLoading = false }: UserDetailProps) {
  if (isLoading) {
    return (
      <section className="user-detail" aria-label="Selected user">
        <div className="skeleton skeleton--avatar" />
        <div className="skeleton skeleton--line" />
        <div className="skeleton skeleton--line" />
        <div className="skeleton skeleton--button" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="user-detail user-detail--empty" aria-label="Selected user">
        <p>Select a user to view their details.</p>
      </section>
    );
  }

  return (
    <section className="user-detail" aria-label={`${getFullName(user)} details`}>
      <img className="user-detail__avatar" src={user.avatar} alt={getFullName(user)} />
      <dl className="user-detail__data">
        <div>
          <dt>Email:</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>First Name:</dt>
          <dd>{user.first_name}</dd>
        </div>
        <div>
          <dt>Last Name:</dt>
          <dd>{user.last_name}</dd>
        </div>
      </dl>
      <Button fullWidth>Proceed</Button>
    </section>
  );
}
