import Link from 'next/link';
import { useAuth, useMemberstackModal } from '@memberstack/react';
import msLogo from '@/app/assets/memberstack-logo.svg';

const NavBar = () => {
  const { signOut, isLoggedIn } = useAuth();
  const { openModal, hideModal } = useMemberstackModal();
  return (
    <header className='bg-slate-900'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='w-full py-4 flex items-center justify-between'>
          <div className='flex items-center'>
            <Link href='/'>
              <img className='h-8 w-auto' src={msLogo} alt='memberstack logo' />
            </Link>
          </div>
          <div className='ml-10'>
            {isLoggedIn ? (
              <button className='btn btn-primary' onClick={signOut}>
                Log Out
              </button>
            ) : (
              <button
                className='btn btn-primary'
                onClick={() => openModal({ type: 'LOGIN' }).then(() => hideModal())}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
