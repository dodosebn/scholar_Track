import React from 'react';
import DashBoard from './page';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <DashBoard /> 
      <main className="lg:ml-64 flex-1 p-4"> 
        
        {children}
      </main>
    </div>
  );
}
