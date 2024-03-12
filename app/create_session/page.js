"use client"
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaSync } from 'react-icons/fa';
import Navbar from '../components/navbar';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../context/context';
import LoadingSpinner from '../components/loading';
import { useRouter } from 'next/navigation';


const CreateSession = () => {
  const [uuid, setUUID] = useState(uuidv4());
  const [showLoading, setShowLoading] = useState(false)
  const router = useRouter();
  
  const resetUUID = () => {
    setUUID(uuidv4());
  };
  const handleClick = async()=>{
    let body = {
      "uuid": uuid,
      "username": username?.current?.value
    }
    setShowLoading(true)
    try {
      let response = await axios.post(`${BACKEND_BASE_URL}/auth/jwt`, body)
      const {jwt:token} = response.data
      localStorage.setItem('token', token)
      router.push("/"); 
    }
    catch (error) {
      console.log(error)
      setShowLoading(false)
      alert("Service currently unavilable. Try again later")
    }
  }
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  if(token!==null){
    router.push("/")
  }
  let username = useRef()
  return (
    <>
      <Navbar token={token}/>
      {showLoading && <LoadingSpinner/>}
      <div className="flex flex-col items-center justify-center create-session">
        <h1 className="text-2xl font-bold mb-4">Create Session</h1>
        <div className="flex items-center mb-4">
          <div className='flex gap-5 m-5 flex-col'>
            <div className='flex items-center'>
              <label htmlFor="uuid">UUID:</label>
              <button onClick={resetUUID} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full ml-2">
                  <FaSync />
              </button>
            </div>
            <div className="flex items-center">
              <input id="uuid" type="text" value={uuid} readOnly className="border border-gray-300 px-2 py-1 rounded-md w-80 md:w-75" />
            </div>
          </div>
        </div>

        <div className="flex mb-4 flex-col">
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" className="border border-gray-300 px-2 py-1 rounded-md mt-2 w-80 md:w-75" ref={username}/>
        </div>

        <button className="bg-black text-white px-6 py-2 mt-8 rounded-md hover:bg-gray-800 
        hover:text-gray-200 focus:outline-none focus:bg-gray-800 focus:text-gray-200"
          onClick={handleClick}
        >
          Create Session
        </button>
      </div>
    </>
  );
}

export default CreateSession;
