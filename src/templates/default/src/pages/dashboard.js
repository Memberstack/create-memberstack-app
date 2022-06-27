import { useAuth, useMemberstack } from '@memberstack/react';
import withLayout from '@/app/layouts/withLayout';

const Dashboard = () => {
  const { userId, status, getToken, isLoggedIn } = useAuth();
  if (!isLoggedIn || userId) return null;

  return (
    <>
      <div className='text-center'>{userId}</div>
    </>
  );
};

export default withLayout(Dashboard, 'basic');
