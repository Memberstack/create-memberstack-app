import { useRouter } from 'next/router';
import Image from 'next/image';
import { useMemberstackModal } from '@memberstack/react';
import withLayout from '@/app/layouts/withLayout';
import logo from '@/app/assets/memberstack-logo-big.svg';

const Home = () => {
  const { openModal, hideModal } = useMemberstackModal();
  const router = useRouter();
  return (
    <>
      <div className='text-center'>
        <header
          className='flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white'
          style={{ fontSize: 'calc(10px + 2vmin)' }}
        >
          <div className='w-full h-full relative py-4' style={{ maxWidth: '40%' }}>
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
            <button
              className='btn btn-primary btn-lg w-full'
              onClick={() =>
                openModal({ type: 'SIGNUP' }).then(({ data }) => {
                  hideModal();
                  router.push(data.loginRedirect);
                })
              }
            >
              👉 Get Started
            </button>
          </div>
        </header>
      </div>
    </>
  );
};

export default withLayout(Home, 'basic');
