import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import Link from 'next/link';
import React, {useState, useEffect, Fragment} from 'react'
import {getAuth} from 'firebase/auth';
import { db } from '../firebase';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Image from 'next/image';





function ViewDeliveries() {
  
  const [open, setOpen] = useState(1);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
    const auth = getAuth()
  const [loading, setLoading] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  
  

  useEffect(() => {


      const q = query(collection(db, 'Deliveries')
      , orderBy("time", "desc"),limit(10));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()})
        })
        setDeliveries(list);
      }, (error) => {
        console.log(error)
      }
    );

    return() => {
      setLoading(!true)
      unsub();
    }
    
    
    

  
  },[]);
  
  return (


    <div className='p-4'>
      <div className='flex gap-4 flex-wrap'>
      {deliveries.length > 0  ? (
        <>
{deliveries?.map((item) => (
<Link key={item.id}  href={`/allcases/${item.id}`} className=''>
<div className='flex flex-col justify-start items-start gap-2 border p-2'>
<Image height={80} width={80} priority className=' object-cover' alt='User avatar' src={item.imageUrl} />

<h1>Order Name: <span>{item.orderName}</span></h1>
<h1>Delivery Address: <span>{item.address}</span></h1>
<div className='flex gap-2 items-center'>
  <span className='w-2 h-2 bg-primary animate-ping rounded-full'></span>
  <h1>{item.status}</h1>
</div>
</div>
</Link>

 ))}
 </>
) : <p className='text-center pt-4 text-primary font-semibold'>No delivery records found.</p>}
      </div>
    </div>

      
      
    
  )
}

export default ViewDeliveries
