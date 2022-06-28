import msAvatar from '@/app/assets/memberstack-avatar.png';
import msLogo from '@/app/assets/memberstack-logo.svg';
import useMember from '@/app/hooks/useMember';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useAuth, useMemberstackModal } from '@memberstack/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

const navigation = [{ name: 'Home', href: '#', current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const NavBar = ({ color = 'bg-slate-900' }) => {
  const { signOut, isLoggedIn } = useAuth();
  const member = useMember();
  const { openModal, hideModal } = useMemberstackModal();

  const userNavigation = [
    { name: 'Profile', action: () => openModal({ type: 'PROFILE' }) },
    { name: 'Sign out', action: async () => await signOut() },
  ];
  return (
    <Disclosure as='nav' className={color}>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center'>
                <div className='py-4'>
                  <Link href='/'>
                    <>
                      <Image src={msLogo} alt='Memberstack logo' height='40' width='40' />
                    </>
                  </Link>
                </div>
                <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    {navigation.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-700 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='ml-4 flex items-center md:ml-6'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='ml-3 relative'>
                    <div>
                      <Menu.Button className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-400'>
                        <span className='sr-only'>Open user menu</span>
                        <div className='h-8 w-8 rounded-full'>
                          <Image src={msAvatar} alt='user avatar' className='rounded-full' />
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {userNavigation.map(item => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <button
                                onClick={item.action}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                )}
                              >
                                {item.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className='-mr-2 flex md:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {navigation.map(item => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className='pt-4 pb-3 border-t border-gray-700'>
              <div className='flex items-center px-5'>
                <div className='flex-shrink-0'>
                  <div className='h-10 w-10 rounded-full'>
                    <Image src={msAvatar} alt='user avatar' className='rounded-full' />
                  </div>
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium leading-none text-white'>{member?.id}</div>
                  <div className='text-sm font-medium leading-none text-gray-400'>
                    {member?.auth?.email}
                  </div>
                </div>
              </div>
              <div className='mt-3 px-2 space-y-1'>
                {userNavigation.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as='button'
                    onClick={item.action}
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
