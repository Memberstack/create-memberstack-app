import '@/app/styles.css';
import { MemberstackProtected, MemberstackProvider, useMemberstackModal } from '@memberstack/react';
import { useRouter } from 'next/router';

const publicPages = ['/signup', '/'];
const msConfig = { publicKey: process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY };

export function withMemberstack(AppComponent) {
  return function WrappedApp(props) {
    return (
      <MemberstackProvider config={msConfig}>
        <AppComponent {...props} />
      </MemberstackProvider>
    );
  };
}

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const { openModal, hideModal } = useMemberstackModal();
  return (
    <>
      {publicPages.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <MemberstackProtected
          onUnauthorized={() =>
            openModal({ type: 'LOGIN' }).then(({ data, type }) => {
              return hideModal();
            })
          }
        >
          <Component {...pageProps} />
        </MemberstackProtected>
      )}
    </>
  );
};

export default withMemberstack(App);
