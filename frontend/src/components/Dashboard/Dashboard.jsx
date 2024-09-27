import React from 'react'
import { FiPlus } from "react-icons/fi";
import Table from '../Table.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const Dashboard = () => {
  return (
    <section>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='bg-white w-max px-7 py-5'>
        <header className='text-xl font-bold flex flex-row justify-between items-center gap-2'>
          <p>Students</p>
          <FiPlus size={25} className='border border-black rounded p-0.5'/>
        </header>
        <Table/>
      </div>
    </ThemeProvider>
    </section>
  )
}

export default Dashboard