import logo from '@/app/assets/memberstack-logo-big.svg';
import withLayout from '@/app/layouts/withLayout';
import { useAuth, useMemberstackModal } from '@memberstack/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Home = () => {
  const { openModal, hideModal } = useMemberstackModal();
  const { signOut, isLoggedIn } = useAuth();
  const router = useRouter();
  return (
    <div
      className='flex flex-col w-full h-full text-center'
      style={{ fontSize: 'calc(10px + 2vmin)' }}
    >
      <div className='flex flex-col items-center justify-center'>
        <div className='w-full h-full relative py-4' style={{ maxWidth: '60%' }}>
          <Image
            src={logo}
            className='pointer-events-none animate-[spin_18s_linear_infinite]'
            alt='logo'
          />
        </div>
        <h1 className='h1 text-slate-200'>
          <span className='block xl:inline'>Welcome to</span>
          <span className='block text-sky-400 xl:inline'> Memberstack</span>
        </h1>
        <p className='p mx-auto text-slate-400'>To get started with the demo, sign up below 🚀</p>
        <div className='mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8'>
          {isLoggedIn ? (
            <button
              className='btn btn-primary btn-lg w-full'
              onClick={() => router.push('/dashboard')}
            >
              👉 Go to Dashboard
            </button>
          ) : (
            <button
              className='btn btn-primary btn-lg w-full'
              onClick={() =>
                openModal({ type: 'SIGNUP' }).then(({ data, type }) => {
                  hideModal();
                  if (type === 'SIGNUP') router.push(data.loginRedirect);
                })
              }
            >
              👉 Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default withLayout(Home, 'basic');
