import React from 'react'

const Sidebar = () => {
  return (
    <div className="bg-white w-48 h-full px-7 py-5">
      <header className="text-[#7065FF] text-xl font-bold mb-5">DemoName</header>
      <ul className="ml-3 flex flex-col gap-3 text-[#828282] text-sm">
        <li>Dashboard</li>
        <li>Student</li>
        <li>Teachers</li>
        <li>Schedule</li>
        <li>Event</li>
      </ul>
    </div>
  )
}

export default Sidebar