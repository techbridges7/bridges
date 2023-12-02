import React, { useContext } from 'react';
import Image from 'next/image';
import {getAuth} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Dialog } from '@headlessui/react';
import UserModal from './UserModal'; 

import {
    BellAlertIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
    PlusCircleIcon,
    EnvelopeIcon,
    PlusIcon,
    Bars3Icon,
    AcademicCapIcon,
    PresentationChartBarIcon,
    ComputerDesktopIcon,
    
     } from '@heroicons/react/24/outline'
     import { HomeIcon,Bars4Icon,
       } from '@heroicons/react/24/outline'
import Link from 'next/link.js';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const auth = getAuth()

  

  

  return (
    <div className='flex justify-between px-4 pt-4 pb-2 border-b bg-white border-gray-300 shadow-sm shadow-gray-300'>
<div className=' w-full mt-2 cursor-pointer'>
  <Link href="/">
  <Image width={180} height={180} src="/tech-bridges logo 1 2.25.svg" />
            </Link>
        </div>





    <div className='flex items-center gap-3 '>
    
<div className='relative navBtn text-primary'>
<Link href="#" >
<BellAlertIcon  className='navBtn' />
</Link>
{/* <div className='absolute -top-3 -right-2 text-xs w-5 h-5 bg-primary rounded-full
flex items-center justify-center text-white animate-bounce
'>3</div> */}
</div>
<div className='relative navBtn text-primary'>
<Link href="#" >
<EnvelopeIcon  className='navBtn' />
</Link>

</div>
<div className='relative navBtn text-primary'>
        <UserCircleIcon className='navBtn' onClick={openModal} />
      </div>


      <UserModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />


</div>
<div className='shadow-md border-b bg-sky-500 text-white fixed md:hidden w-full bottom-0 z-50'>
      
      <div className='flex justify-around max-w-8xl py-2 mx-5 xl:mx-auto  '>
 
      <Link href="/" >
    <HomeIcon className='navBtn' />
    </Link>
      <Link href="/allcases" >
    <Bars3Icon  className='navBtn' />
    </Link>
    <div className='relative navBtn'>
    <Link href="/" >
    <AcademicCapIcon  className='navBtn' />
    </Link>
    {/* <div className='absolute -top-3 -right-2 text-xs w-5 h-5 bg-primary rounded-full
    flex items-center justify-center text-white animate-bounce
    '>3</div> */}
    </div>
    <Link href="/">
    <PresentationChartBarIcon   className='navBtn' />
    </Link>
    
    
    <Link href="/" >
    <ComputerDesktopIcon  className='navBtn' />
    </Link>
     
   
     


    
      </div>
      
  </div>
   
    </div>
  )
}

export default Header
