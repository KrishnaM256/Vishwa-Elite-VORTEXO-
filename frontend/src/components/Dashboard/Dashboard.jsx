import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi";
import Table from '../Table.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Profile from '../Profile.jsx';
import DialogBox from '../Dialog.jsx';

const theme = createTheme();

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <section className='flex flex-row gap-3'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='bg-white flex flex-col w-max px-7 py-5'>
          <header className='text-xl font-bold flex flex-row justify-between items-center gap-2'>
            <p>Students</p>
            <FiPlus size={25} className='border border-black rounded p-0.5 cursor-pointer' onClick={handleOpen}/>
          </header>
          <Table/>
        </div>
      </ThemeProvider>
      <Profile/>
      <DialogBox isOpen={isOpen} onClose={handleClose} title="Add Student">
        
      </DialogBox>
    </section>
  );
}

export default Dashboard