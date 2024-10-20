import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return(
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-white max-h-screen overflow-hidden">
          <Header/>
          <div className="flex-1 p-4 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }

export default DashboardLayout