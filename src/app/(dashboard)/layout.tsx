import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import React from 'react'

const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return(
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-white">
          <Header/>
          <div className="p-4 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }

export default DashboardLayout