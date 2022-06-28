import Switch from '@/components/Switch';
import DashboardNavBar from './dashboard/NavBar';
import NavBar from './NavBar';

const BasicLayout = ({ children }) => (
  <div className='h-screen flex flex-col bg-[#282c34]'>
    <NavBar color={'bg-[#282c34]'} />
    <main className='mx-auto my-auto max-w-7xl px-4'>{children}</main>
  </div>
);

const DashboardLayout = ({ children }) => {
  return (
    <div className='h-screen flex flex-col bg-gray-100 overflow-hidden'>
      <DashboardNavBar />
      <header className='bg-white shadow-md'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-slate-900'>Dashboard</h1>
        </div>
      </header>
      <main className='w-screen overflow-auto'>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>{children}</div>
      </main>
    </div>
  );
};

const withLayout = (Page, variant) => props =>
  (
    <Switch expression={variant} fallback={<Page {...props} />}>
      <BasicLayout case='basic'>
        <Page {...props} />
      </BasicLayout>
      <DashboardLayout case='dashboard'>
        <Page {...props} />
      </DashboardLayout>
    </Switch>
  );

export default withLayout;
