import { useEffect, useMemo, useState } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ReqresUser } from '../api/reqres';
import { getUser, getUsers } from '../api/reqres';
import { BrandLogo } from '../components/BrandLogo';
import { Button } from '../components/Button';
import { HeaderProfile } from '../components/HeaderProfile';
import { Sidebar } from '../components/Sidebar';
import { UserCard } from '../components/UserCard';
import { UserDetail } from '../components/UserDetail';

export function UsersPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [users, setUsers] = useState<ReqresUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ReqresUser | undefined>();
  const [pageMeta, setPageMeta] = useState({ page: 2, totalPages: 2 });
  const [isListLoading, setIsListLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const selectedId = Number(userId);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      setIsListLoading(true);
      setError('');

      try {
        const response = await getUsers(2);

        if (!isMounted) return;

        setUsers(response.data);
        setPageMeta({ page: response.page, totalPages: response.total_pages });

        if (!userId && response.data[0]) {
          setSelectedUser(response.data[0]);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load users.');
        }
      } finally {
        if (isMounted) {
          setIsListLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  useEffect(() => {
    if (!selectedId) return;

    let isMounted = true;

    async function loadDetail() {
      setIsDetailLoading(true);
      setError('');

      try {
        const response = await getUser(selectedId);

        if (isMounted) {
          setSelectedUser(response.data);
        }
      } catch (detailError) {
        if (isMounted) {
          setError(detailError instanceof Error ? detailError.message : 'Unable to load user detail.');
        }
      } finally {
        if (isMounted) {
          setIsDetailLoading(false);
        }
      }
    }

    loadDetail();

    return () => {
      isMounted = false;
    };
  }, [selectedId]);

  const activeUser = useMemo(() => {
    if (selectedUser) return selectedUser;
    return users[0];
  }, [selectedUser, users]);

  function handleSelect(user: ReqresUser) {
    setSelectedUser(user);
    navigate(`/users/${user.id}`);
  }

  return (
    <main className="portal-page">
      <Sidebar />

      <section className="portal-page__content">
        <header className="mobile-topbar">
          <a className="mobile-topbar__brand" href="/users">
            <BrandLogo />
            <strong>Career Portal</strong>
          </a>
          <Button className="mobile-topbar__menu" aria-label="Open menu">
            <Menu size={18} />
          </Button>
        </header>

        <div className="portal-header">
          <div>
            <h1>Users</h1>
            <p>
              Page {pageMeta.page} of {pageMeta.totalPages}
            </p>
          </div>
          <HeaderProfile user={activeUser} />
        </div>

        {error && <p className="form-alert form-alert--error portal-error">{error}</p>}

        <div className="portal-grid">
          <section className="user-list" aria-label="Users list">
            {isListLoading
              ? Array.from({ length: 6 }).map((_, index) => <div className="user-card user-card--loading" key={index} />)
              : users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isSelected={activeUser?.id === user.id}
                    onSelect={handleSelect}
                  />
                ))}
          </section>

          <UserDetail user={activeUser} isLoading={isDetailLoading} />
        </div>
      </section>
    </main>
  );
}
