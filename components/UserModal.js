import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function UserModal({ isOpen, setIsOpen }) {
  const [userData, setUserData] = useState({ name: '', email: '', address: '' });
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
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, userData);
      setIsOpen(false); // Close modal after update
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={() => setIsOpen(false)}>&times;</span>
        <h2>Edit User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Name:</label>
            <input type="text" name="name" value={userData.name} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label>Email:</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label>Address:</label>
            <input type="text" name="address" value={userData.address} onChange={handleChange} />
          </div>
          <button className=' bg-primary' type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
