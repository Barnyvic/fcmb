import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, getUsers } from '../api/reqres';
import { HeaderProfile } from '../components/HeaderProfile';
import { PortalShell } from '../components/PortalShell';
import { UserCard } from '../components/UserCard';
import { UserDetail } from '../components/UserDetail';
import type { ReqresUser } from '../types/reqres';

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
    <PortalShell>
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="m-0 text-[clamp(42px,5vw,64px)] leading-none font-extrabold text-[#dfdfe2]">Users</h1>
            <p className="mt-2 font-semibold text-[#74727a]">
              Page {pageMeta.page} of {pageMeta.totalPages}
            </p>
          </div>
          <div className="max-[820px]:hidden">
            <HeaderProfile user={activeUser} />
          </div>
        </div>

        {error && <p className="mt-5 w-full rounded-[5px] bg-[#fdecef] p-3 text-sm leading-[1.4] text-[#8b1624]">{error}</p>}

        <div className="mt-14 grid grid-cols-[minmax(420px,1fr)_minmax(310px,0.66fr)] items-start gap-12 max-[1180px]:grid-cols-1 max-[820px]:mt-7 max-[820px]:gap-7">
          <section className="grid max-h-[calc(100vh-210px)] gap-5 overflow-auto pr-2 max-[820px]:max-h-none max-[820px]:overflow-visible max-[820px]:pr-0" aria-label="Users list">
            {isListLoading
              ? Array.from({ length: 6 }).map((_, index) => <div className="min-h-[150px] animate-pulse rounded bg-slate-100 max-[820px]:min-h-[124px]" key={index} />)
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
    </PortalShell>
  );
}
