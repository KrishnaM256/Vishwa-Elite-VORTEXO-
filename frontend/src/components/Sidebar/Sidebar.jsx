import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="bg-white w-48 h-full px-7 py-5">
      <header className="text-[#7065FF] text-xl font-bold mb-5">DemoName</header>
      <ul className="ml-3 flex flex-col gap-3 text-[#828282] text-sm">
        <Link to={'/dashboard'}>Dashboard</Link >
        <Link to={'/student'}>Student</Link >
        <Link to={'/teachers'}>Teachers</Link >
        <Link to={'/schedule'}>Schedule</Link >
        <Link to={'/event'}>Event</Link >
      </ul>
    </div>
  )
}

export default Sidebar