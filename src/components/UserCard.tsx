import type { ReqresUser } from '../api/reqres';
import { getFullName } from '../utils/user';

type UserCardProps = {
  user: ReqresUser;
  isSelected: boolean;
  onSelect: (user: ReqresUser) => void;
};

export function UserCard({ user, isSelected, onSelect }: UserCardProps) {
  return (
    <button className={`user-card ${isSelected ? 'is-selected' : ''}`} type="button" onClick={() => onSelect(user)}>
      <img src={user.avatar} alt={getFullName(user)} />
      <span className="user-card__divider" />
      <span className="user-card__content">
        <span>
          <strong>Email:</strong>
          <span>{user.email}</span>
        </span>
        <span>
          <strong>First Name:</strong>
          <span>{user.first_name}</span>
        </span>
        <span>
          <strong>Last Name:</strong>
          <span>{user.last_name}</span>
        </span>
      </span>
    </button>
  );
}
