import React, {useState} from 'react'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  import { useRouter } from 'next/router';
import { WithPublic } from '../context/Route';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';


function Login() {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password:''
  })
  const {email, password} = formData
  const router = useRouter();
  const onChange = (e) => {
setFormData((prevState) => ({
  ...prevState,
  [e.target.id]:e.target.value

}))
  }
  

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const auth = getAuth();
      

      const userCredential = await signInWithEmailAndPassword(
        auth, email, password
      );

      if (userCredential.user) {
        const uid = auth.currentUser.uid;
        const userDocRef = doc(db, "users", uid); // Reference to the user's document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData.role; // Get the role from the user's document

          // Redirect based on role
          if (userRole === "admin") {
            router.push('/'); // Redirect to admin page
          } else if (userRole === "manager") {
            router.push('/'); // Redirect to manager page
          } else {
            router.push('/'); // Redirect to user page or default page
          }
        } else {
          console.log("No such document!");
        }
      } else {
        alert("User not found");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed h-full w-full bg-gradient-to-t from-secondary from-10% via-white via-30% to-primary to-90%'>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md p-16 rounded-md shadow-md bg-white">
          <div className='flex justify-center item-center'>
          <img src='tech-bridges logo 1 2.25.svg' alt='Logo' />
          </div>
        
          <div>
         
           
           
            
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChange}
                  
                  
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email Address"
                />
              </div>
              <div>
                <label htmlFor="Password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={onChange}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                />
                
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
                
              </div>

              <div className="text-sm">
                <a href="/passowrd-forgot" className="font-medium custom-link">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
              
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
                </span>
                Login
              </button>
              
            </div>
          </form>
        </div>
      </div>
      </div>
  )
}

export default WithPublic (Login)


