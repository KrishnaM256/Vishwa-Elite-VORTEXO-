import React from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout

