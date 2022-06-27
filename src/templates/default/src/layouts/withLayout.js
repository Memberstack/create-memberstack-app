import Switch from '@/components/Switch';
import NavBar from './NavBar';

const BasicLayout = ({ children }) => (
  <div className='h-screen min-h-full flex flex-col justify-between'>
    <NavBar />
    <main className='mx-auto max-w-7xl px-4'>{children}</main>
    <footer className='bg-sky-500'>hello</footer>
  </div>
);

// TODO - add design for AppLayout
const AppLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

const withLayout = (Page, variant) => props =>
  (
    <Switch expression={variant} fallback={<Page {...props} />}>
      <BasicLayout case='basic'>
        <Page {...props} />
      </BasicLayout>
      <AppLayout case='app'>
        <Page {...props} />
      </AppLayout>
    </Switch>
  );

export default withLayout;
