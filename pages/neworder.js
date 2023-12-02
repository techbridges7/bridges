import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import {getAuth} from 'firebase/auth';
import { db } from '../firebase';
import { WithProtected } from '../context/Route';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';


function NewOrder() {

   const auth = getAuth()
  const [loading, setLoading] = useState(true);
  const [deliveries, setDeliveries] = useState([]);
  

 

  useEffect(() => {
    
   
    const q = query(collection(db, 'Deliveries')
      ,where ("status", "==", "NEW"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()})
        })
        setDeliveries(list);
      }, (error) => {
        alert(error)
      }
    );

    return() => {
      unsub();
    }
    
    
    

  
  },[]);
  
  const updateStatus = async (id, newStatus) => {
    const deliveryRef = doc(db, 'Deliveries', id);
    try {
      await updateDoc(deliveryRef, { status: newStatus });
    } catch (error) {
      console.error('Error updating status: ', error);
    }
  };

  return (
    <main className='bg-white min-h-screen'>
        <Header />
        <div className='p-4'>
        <nav aria-label="breadcrumb" className="flex text-sm">
      <ol className="flex items-center space-x-2">
        <li>Home</li>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        <li>Dashboard</li>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        <li>Available Orders</li>
      </ol>
    </nav>
        </div>
        <div className='p-8 h-screen'>
        <div className='h-full w-full p-1 md:p-4 pb-4 '>
      
      <div className='bg-white w-full mt-6 h-[700px] md:h-5/6
        overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-sky-700
        scrollbar-track-gray-700 rounded-lg p-4 '>
           
        
                  
        <div className="min-h-screen py-5">
        <div className='overflow-x-auto w-full'>
            <table className='mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead className="bg-primary">
                    <tr className="text-white text-left">
                        <th className="font-semibold text-sm uppercase px-6 py-4"> Order Name </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4"> Order Number </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> status </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Date </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {deliveries?.map((item) => (

                  
                    <tr key={item.id}>
                        <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                                <div className="inline-flex w-10 h-10"> <img className='w-10 h-10 object-cover rounded-full' alt='User avatar' src={item.imageUrl} /> </div>
                                <Link href={`/allcases/${item.id}`} className="text-purple-800 hover:underline">
                               <div>
                                    <p> {item.orderName} </p>
                                    <p className="text-gray-500 text-sm font-semibold tracking-wide">  </p>
                                </div>
                                </Link>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <p className=""> {item.orderNumber} </p>
                            <p className="text-gray-500 text-sm font-semibold tracking-wide"> Development </p>
                        </td>
                        <td className="px-6 py-4 text-center">
  <span
    className={`text-white text-sm w-1/3 pb-1 font-semibold px-2 rounded-full ${
      item.status === 'in Delivery' ? 'bg-blue-600' :'bg-yellow-600'
       
    }`}
  >
    {item.status}
  </span>
</td>
                        <td className="px-6 py-4 text-center"> {item.time && item.time.toDate().toDateString()} </td>
                        <td className="px-6 py-4 text-center">
        <button 
          className="bg-primary w-10 text-white p-2 rounded mr-2"
          onClick={() => updateStatus(item.id, 'rejected')}
        >
          <XMarkIcon />
        </button>
        <button 
          className="bg-green-500 w-10 text-white p-2 rounded"
          onClick={() => updateStatus(item.id, 'Enroute')}
        >
          <CheckIcon />
        </button>
      </td>
                    </tr>
                    ))}
                    
                    
                    
                </tbody>
            </table>
        </div>
    </div>

      </div>
    </div>
        </div>
        
       
        
    </main>
   
  )
}

export default WithProtected(NewOrder)
