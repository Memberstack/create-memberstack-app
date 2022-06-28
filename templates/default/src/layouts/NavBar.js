import msLogo from '@/app/assets/memberstack-logo.svg';
import { useAuth, useMemberstackModal } from '@memberstack/react';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = ({ color = 'bg-slate-900' }) => {
  const { signOut, isLoggedIn } = useAuth();
  const { openModal, hideModal } = useMemberstackModal();
  return (
    <header className={color}>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='w-full py-4 flex items-center justify-between'>
          <div className='flex items-center'>
            <Link href='/'>
              <div className='h-8 w-full' style={{ maxWidth: '50px' }}>
                <Image src={msLogo} alt='Memberstack logo' />
              </div>
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
