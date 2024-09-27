import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Navbar from './components/Navbar/Navbar.jsx'
import './Layout.css';

const Layout = () => {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Layout;
