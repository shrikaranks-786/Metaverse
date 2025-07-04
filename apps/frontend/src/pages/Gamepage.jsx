import React, { useDebugValue, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";

function Gamepage() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const roomId = pathSegments[2];

  const [users,setusers] = useState([]);

  useEffect(()=>{
    const baseurl = import.meta.env.VITE_BACKEND_BASE_URL;
    const socket = io(baseurl);

    socket.emit("join-room",{
      userId : "dogesh123",
      roomid : roomId,
      username : "dogesh",
      email : "dogesh@gmail.com"
    });

    socket.on("existing-players",(players)=>{
      console.log(players);
      setusers(players);
    });

    socket.on("user-joined",(data) => {
      setusers(prev => [...prev, data]);
    })
  },[]);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-[95%] h-[80%] border-6 border-gray-600 p-5'>
      </div>
    </div>
  )
}

export default Gamepage