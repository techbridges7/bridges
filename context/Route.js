import React from 'react'
import {getAuth} from 'firebase/auth'
import { Router, useRouter } from 'next/router';
export function WithPublic(Component) {

 return function WithPublic(props){
const auth = getAuth();
const router = useRouter();

if (auth.currentUser){
    router.replace('/');
    return <h1>Loading...</h1>
}
    return <Component auth={auth} {...props} />
 };
}

export function WithProtected(Component) {
    return function WithProtected(props){
        const auth = getAuth();
        const router = useRouter();
        
        if (!auth.currentUser){
            router.replace('/Login');
            return <h1>Loading...</h1>
        }
            return <Component auth={auth} {...props} />
         };
   }
   
