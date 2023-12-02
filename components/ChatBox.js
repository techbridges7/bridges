// ChatBox.js
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';

const ChatBox = () => {
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();

  
  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const chatsQuery = query(
        collection(db, 'users', uid, 'chat'),
        where('status', '==', uid), // Filter messages where status matches the current user's UID
        orderBy('timestamp')
      );

      const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
        const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChatMessages(messages);
      });

      return () => unsubscribe();
    }
  }, [db, auth.currentUser]);




  
  const sendMessage = async () => {
    if (message.trim() === '') return;

    try {
      await addDoc(collection(db, `users/${auth.currentUser.uid}/chat`), {
        message: message,
        timestamp: new Date(),
        status:auth.currentUser.uid,
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  const toggleChatBox = () => {
    setIsChatBoxVisible(!isChatBoxVisible);
  };

  return (
    <>
      {isChatBoxVisible && (
        <div className="fixed bottom-20 right-4 bg-white p-4 rounded-lg shadow-lg border">
          <div className='h-40 p-2 overflow-auto'>
            {chatMessages.map(msg => (
              <div key={msg.id}>{msg.message}</div>
            ))}
          </div>
          <input 
            type="text" 
            className="border p-2 rounded w-full" 
            placeholder="Message..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="bg-secondary text-white p-2 rounded mt-2 w-full" onClick={sendMessage}>Send</button>
        </div>
      )}
      <div className='fixed bottom-4 right-4 w-16 h-16 justify-center items-center flex'>
        <button onClick={toggleChatBox} className='bg-primary rounded-full'>
          <ChatBubbleLeftEllipsisIcon className='text-white w-8 h-8' />
        </button>
      </div>
    </>
  );
};

export default ChatBox;
