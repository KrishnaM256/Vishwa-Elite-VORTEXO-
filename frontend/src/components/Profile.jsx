import React from 'react'
import Divider from './Divider.jsx'
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";


const Profile = () => {
    return (
        <section className='bg-white flex flex-col justify-start w-80 px-7 py-5'>
            <div className='flex flex-col justify-center gap-2'>
                <div className='flex flex-col items-center justify-center'>
                    <img src='user.png' alt='profile' className='w-24 mb-2 rounded-full' />
                    <p className='text-xl font-bold mb-4'>Viraj Zuluk</p>
                    <p className='text-sm text-[#A5A5A5] align-left'>PRN: <span className='font-bold pl-0.5 text-[#454545]'>PRN001</span></p>
                    <p className='text-sm text-[#A5A5A5] align-left'>Year: <span className='font-bold pl-0.5 text-[#454545]'>2020</span></p>
                    <p className='text-sm text-[#A5A5A5] align-left'>Dept: <span className='font-bold pl-0.5 text-[#454545]'>CSE</span></p>
                    <p className='text-sm text-[#A5A5A5] align-left'>Class: <span className='font-bold pl-0.5 text-[#454545]'>2020</span></p>
                </div>

                <Divider />

                <div className='overflow-y-auto h-40 custom-scrollbar h-72'>
                    <div className='flex flex-col gap-2 mb-3'>
                        <p className='text-sm text-[#454545] font-bold'>Subjects</p>
                        <div className='flex overflow-x-auto pb-2 gap-2 custom-scrollbar'>
                            <span className='text-sm text-[#131212] border border-0.5 p-1 rounded-md whitespace-nowrap'>TOC</span>
                            <span className='text-sm text-[#131212] border border-0.5 p-1 rounded-md whitespace-nowrap'>OS</span>
                            <span className='text-sm text-[#131212] border border-0.5 p-1 rounded-md whitespace-nowrap'>DBMS</span>
                            <span className='text-sm text-[#131212] border border-0.5 p-1 rounded-md whitespace-nowrap'>ADS</span>
                            <span className='text-sm text-[#131212] border border-0.5 p-1 rounded-md whitespace-nowrap'>MainFrame</span>
                        </div>
                    </div>

                    <Divider />

                    <div className='flex flex-col gap-2 pb-2 pt-2'>
                        <p className='text-sm text-[#454545] font-bold'>Events</p>
                        <div>
                            <div className='flex pb-2 gap-2'>
                                <div className='flex flex-row gap-2'>
                                    <img src='event.png' alt='eventphoto' className='h-20' />
                                    <div className='flex flex-col'>
                                        <p className='text-[15px] text-[#454545] font-semibold'>CodeSprint</p>
                                        <p className='text-[13px] text-[#A5A5A5] pb-1'>12 Sept 2024</p>
                                        <p className='text-[12px] text-[#A5A5A5]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex pb-2 gap-2'>
                                <div className='flex flex-row gap-2'>
                                    <img src='event.png' alt='eventphoto' className='h-20' />
                                    <div className='flex flex-col'>
                                        <p className='text-[15px] text-[#454545] font-semibold'>CodeSprint</p>
                                        <p className='text-[13px] text-[#A5A5A5] pb-1'>12 Sept 2024</p>
                                        <p className='text-[12px] text-[#A5A5A5]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Divider />

                    <div className='flex flex-col gap-2 pt-2'>
                        <p className='text-sm text-[#454545] font-bold'>Personal Details</p>
                        <div className='flex flex-col gap-2 pl-3'>
                            <div className='flex flex-row gap-2 pb-0.5'>
                                <FiMail size={23} color='#A5A5A5' className='' /> <span className='text-sm'>vrzuluk@gmail.com</span>
                            </div>
                            <div className='flex flex-row gap-2 pb-0.5'>
                                <FiPhone size={23} color='#A5A5A5' className='' /> <span className='text-sm'>vrzuluk@gmail.com</span>
                            </div>
                            <div className='flex flex-row gap-2 pb-0.5'>
                                <FiMapPin size={23} color='#A5A5A5' className='' /> <span className='text-sm'>vrzuluk@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile