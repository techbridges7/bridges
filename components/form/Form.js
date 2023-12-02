import React,{useState, useRef, Fragment, useEffect} from 'react'

import PatientInfo from './PatientInfo';


import {getAuth} from 'firebase/auth'
import { db } from '../../firebase';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { addDoc, doc, setDoc, updateDoc, collection, serverTimestamp, getDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function form() {

  const router = useRouter();
  const pID = Math.random().toString().slice(2, 9);
  const auth = getAuth()
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    orderName: '',
    address: '',
    phoneNumber: '+971 ',
    lat: '',
    long:'',     
    imageUrl:'',
    orderNumber:"000000",
   
    time:serverTimestamp()

  });
const {orderName,address,phoneNumber,lat,long,imageUrl,orderNumber} = formData

  const [userData, setUserData] = useState([])
  const [userProfile, setUserProfile] = useState([])
  
  const getData = async () => {

    try {
      const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
        console.log("Current data: " + auth.currentUser.uid, doc.data());
        setUserProfile(doc.data())
    });
    
    } catch (error) {
        console.log(error)
    }


    
}


useEffect(() => {
   getData();
   
  }, []);

   
  

  
  
  const onSubmit = async (e) => {
    e.preventDefault()
    
    
try {
  const docRef = await addDoc(collection(db, "Deliveries"), {
    patientid:"P" + pID,
    userId:auth.currentUser.uid,
    userName:auth.currentUser.displayName,
    orderName: orderName,
    address: address,
    phoneNumber: phoneNumber,
    lat: lat,
    long:long,     
    imageUrl:imageUrl,
    orderNumber:orderNumber,
    status:"NEW",
    time:serverTimestamp(),
    
  });

 
  toast.success("Order Submitted Successfully!", {
    position: toast.POSITION.BOTTOM_CENTER
  });
  setTimeout(() => {
    router.reload();
  }, 2000);
  
} catch (error) {
  toast.error("There has been error submitting the form, please try again.", {
    position: toast.POSITION.BOTTOM_CENTER
  });
  console.log(error)
}

   
  }
 
 

  return (
    <div className='bg-white p-4 rounded-md lg:h-5/6'>
      
       <form onSubmit={onSubmit}>


       <PatientInfo formData={formData} setFormData={setFormData}/>

      
      </form>

      <div className=" flex justify-end px-4 py-3  sm:px-6">
      


      <button
                    type="submit"
                    onClick={onSubmit}

                    className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                  >
                    Submit
                  </button>


                </div>
                
                <ToastContainer
          theme="colored"
          autoClose={3000}
          limit={1} />
    </div>
  )
}

export default form
