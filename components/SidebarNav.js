import { AcademicCapIcon, ArrowRightOnRectangleIcon, BanknotesIcon, Bars3Icon, ComputerDesktopIcon, DocumentArrowDownIcon, HomeIcon, PlusIcon, PresentationChartBarIcon, UserGroupIcon  } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useState, useContext } from 'react'
import {getAuth} from 'firebase/auth'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { UsersIcon } from '@heroicons/react/20/solid';
import { CheckBadgeIcon, TruckIcon } from '@heroicons/react/24/solid';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function SidebarNav({children}) {
  
  const auth = getAuth();
  const router = useRouter();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
      const fetchUserRole = async () => {
          if (auth.currentUser) {
              const uid = auth.currentUser.uid;
              const userDocRef = doc(db, 'users', uid);
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                  setUserRole(userDoc.data().role);
              }
          }
      };
console.log("hello")
      fetchUserRole();
  }, [auth.currentUser]);

    
       const onLogout = () => {
        auth.signOut()
        router.replace('/Login');


    }
  return (

    
    <div className='flex'>
      <div  className={`md:fixed h-screen p-4 bg-primary border-r-[1px]
      border-gray-200 md:flex md:flex-col hidden justify-between transition-all duration-200 ease-linear
      overflow-y-auto scrollbar-thin scrollbar-thumb-white
            scrollbar-track-gray-700`}>
<div className='fkex flex-col items-center'>

<Link title="Dashboard" href='/'>
        <div className='  bg-white hover:bg-black  p-1 text-primary hover:text-white
        rounded-md hover:rounded-2xl transition-all duration-200 ease-linear flex justify-start items-center gap-3 '>
            <i><HomeIcon  height={36}/></i>
             <h2>Dashboard</h2>
        </div>
        </Link>

        <span className='border-b-[2px] border-white w-full p-2'></span>
{userRole === 'admin' && ( 
<>
<Link title="Add New patient" href='/allorders'>
        <div className='sidebar-icon'>
            <i><TruckIcon  height={36}/></i>
             <h2 >View Deliveries</h2>
        </div>
        </Link>
        <Link title="All cases" href='/delivered'>
        <div className='sidebar-icon'>
            <i><CheckBadgeIcon  height={36}/></i>
             <h2 >Delivered</h2>
        </div>
        </Link>
        <Link title="Billing" href='/neworder'>
        <div className='sidebar-icon cursor-pointer'>
            <i><DocumentArrowDownIcon  height={36}/></i>
             <h2 >New Orders</h2>
        </div>
        </Link>
     
</>


)}
{userRole === 'merchant' && ( 
<>
<Link title="Add New patient" href='/allorders'>
        <div className='sidebar-icon'>
            <i><TruckIcon  height={36}/></i>
             <h2 >View Deliveries</h2>
        </div>
        </Link>
        <Link title="All cases" href='/delivered'>
        <div className='sidebar-icon'>
            <i><CheckBadgeIcon  height={36}/></i>
             <h2 >Delivered</h2>
        </div>
        </Link>
        <Link title="Scan Files" href='/addorder'>
        <div className='sidebar-icon cursor-pointer'>
            <i><PlusIcon  height={36}/></i>
            <h2 >Add Order</h2>
        </div>
        </Link>
</>

)}

{userRole === 'customer' && ( 
<>
<Link title="Add New patient" href='/allorders'>
        <div className='sidebar-icon'>
            <i><TruckIcon  height={36}/></i>
             <h2 >View Deliveries</h2>
        </div>
        </Link>
        <Link title="All cases" href='/delivered'>
        <div className='sidebar-icon'>
            <i><CheckBadgeIcon  height={36}/></i>
             <h2 >Delivered</h2>
        </div>
        </Link>
        
</>

)} 
        
        
        
        
        
        
        
       
        
</div>
<div>
        <a onClick={onLogout}>
        <div className='text-black bg-gray-200 hover:text-primary p-1 my-12 border border-gray-300
        rounded-md hover:rounded-2xl transition-all duration-200 ease-linear cursor-pointer flex justify-start items-center gap-3'>
            <i><ArrowRightOnRectangleIcon  height={36}/></i>
            <h2>Exit</h2>
        </div>
        </a>

        </div>
      </div>

      <main className={`w-full  md:ml-48 transition-all duration-200 ease-linear`}>
        {children}
      </main>
    </div>
  )
}

export default SidebarNav
