import React, { useEffect } from 'react';
import { WithProtected } from '../context/Route';
import Header from "../components/Header";
import Form from '../components/form/Form';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/router';

function AddOrder() {
  const router = useRouter();
  const auth = getAuth();

 

  return (
    <main className='bg-gradient-to-r from-white from-10% via-primary via-30% to-secondary to-90% min-h-screen'>
      <Header />
      <div className='p-4 h-screen'>
        <Form />
      </div>
    </main>
  );
}

export default WithProtected(AddOrder);
