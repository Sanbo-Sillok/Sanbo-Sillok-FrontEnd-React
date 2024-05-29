import useAcceptSignup from '@/apis/mutations/useAcceptSignup';
import useAdminSuspenseQuery from '@/apis/queries/useAdminSuspenseQuery';
import PendingUserTable from './PendingUserTable';

export default function Admin() {
  const { data: pendingUserList } = useAdminSuspenseQuery();
  const { mutate: acceptSignup } = useAcceptSignup();

  return (
    <div className="flex h-full w-full items-center justify-center pt-10">
      <PendingUserTable pendingUserList={pendingUserList} acceptSignup={acceptSignup} />
    </div>
  );
}
