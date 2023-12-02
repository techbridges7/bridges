
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { WithProtected } from '../context/Route';
import Link from 'next/link';
import Header from '../components/Header';

import { useEffect, useState } from 'react';

import { ChatBubbleBottomCenterIcon, ChatBubbleLeftEllipsisIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import ViewDeliveries from '../components/VIew-Deliveries';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import ChatBox from '../components/ChatBox';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const inter = Inter({ subsets: ['latin'] })

 function Home() {
  
  const [userData, setUserData] = useState({ name: 'Guest' });
  const auth = getAuth();

  const fetchUserData = async () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
 
  return (
    <>
    <main className='bg-white min-h-screen pb-12'>
        <Header />
        <div className='p-4'>
    <nav aria-label="breadcrumb" className="flex text-sm">
        <ol className="flex flex-col items-start space-y-2">
            <li className="flex items-center space-x-2">
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                <div>Dashboard</div>
            </li>
            <li className="text-6xl">
                Welcome, <span className="font-bold text-secondary">{userData.name}</span>
            </li>
        </ol>
    </nav>
</div>
        
       
      <div className='container mx-auto grid gap-4 p-4 h-[400px]'>
        
        
          <ViewDeliveries />
        
        
      </div>
      <ChatBox />
       
        
    </main>
      
      
    </>
  )
}
export default WithProtected(Home)