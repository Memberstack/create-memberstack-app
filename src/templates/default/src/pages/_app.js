import { useRouter } from 'next/router';
import { MemberstackProvider, MemberstackProtected, SignInModal } from '@memberstack/react';
import '@/app/styles.css';

const publicPages = ['/signup', '/'];
const msConfig = { publicKey: process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY };

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <MemberstackProvider config={msConfig}>
      {publicPages.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <MemberstackProtected onUnauthorized={<SignInModal />}>
          <Component {...pageProps} />
        </MemberstackProtected>
      )}
    </MemberstackProvider>
  );
};

export default App;
