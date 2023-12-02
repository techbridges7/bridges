import { AcademicCapIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, Bars3Icon, ComputerDesktopIcon, DocumentPlusIcon, HomeIcon, PlusCircleIcon, PlusIcon, PresentationChartBarIcon, QuestionMarkCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useState } from 'react'
import {getAuth} from 'firebase/auth'
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
function Sidebar() {
    const auth = getAuth()
    const router = useRouter();
    const [active, setActive] = useState(false);
    
    const handleClick = () => {
        setActive(!active);
      };
      
    const onLogout = () => {
        auth.signOut()
        router.replace('https://www.pearlaligners.com');


    }
  return (
    <div className='fixed rounded-xl my-4 z-50 lg:h-5/6 p-4 ml-4
    hidden lg:flex flex-col bg-white items-center pt-5 gap-5 divide-y-2 divide-black'>
        <div>
        <a onClick={() => setOpen(true)}>
        <div className='sidebar-icon text-center cursor-pointer'>
            <i><DocumentPlusIcon   height={36}/></i>
            <span>New Case</span>
        </div>
        </a>

        </div>
        <div className='flex flex-col justify-center h-full gap-4'>
        <Link href='/'>
        <div className='sidebar-icon'>
            <i><HomeIcon  height={36}/></i>
            <span>Home</span>
        </div>
        </Link>
        <Link href='/allcases'>
        <div className='sidebar-icon'>
            <i><Bars3Icon  height={36}/></i>
            <span>All Cases</span>
        </div>
        </Link>
        <Link href='/academy'>
        <div className='sidebar-icon cursor-pointer'>
            <i><AcademicCapIcon  height={36}/></i>
            <span>Academic</span>
        </div>
        </Link>
        <Link href='/'>
        <div className='sidebar-icon cursor-not-allowed'>
            <i><PresentationChartBarIcon  height={36}/></i>
            <span>Scans</span>
        </div>
        </Link>
        <Link href='/'>
        <div className='sidebar-icon cursor-not-allowed'>
            <i><ComputerDesktopIcon color='black' height={36}/></i>
            <span>Billing</span>
        </div>
        </Link>
        </div>
        <div>
        <a onClick={onLogout}>
        <div className='sidebar-icon hover:bg-primary cursor-pointer'>
            <i><ArrowRightOnRectangleIcon  height={36}/></i>
            <span>Sign Out</span>
        </div>
        </a>

        </div>
      
    </div>
  )
}

export default Sidebar
