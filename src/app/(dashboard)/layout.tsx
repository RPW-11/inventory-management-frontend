import Sidebar from '@/components/sidebar';
import React from 'react'

const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return(
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-4 bg-zinc-200">
          {children}
        </div>
      </div>
    );
  }

export default DashboardLayout