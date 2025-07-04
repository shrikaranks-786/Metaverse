import React, { useDebugValue, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

function Gamepage() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const roomId = pathSegments[2];

  const [users, setusers] = useState([]);
  const [postion, setPostion] = useState({ x: 200, y: 200, z: 0 });

  const handleKeydown = (e) => {
    setPostion((prev) => {
      const step = 10;
      let { x, y, z } = prev;

      switch (e.key) {
        case "ArrowUp":
          y -= step;
          break;
        case "ArrowDown":
          y += step;
          break;
        case "ArrowLeft":
          x -= step;
          break;
        case "ArrowRight":
          x += step;
          break;
        case "w":
          z += step;
          break;
        case "s":
          z -= step;
          break;
        default:
          return prev;
      }

      const newPos = { x, y, z };
      socket.emit("move", newPos);
      return newPos;
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const baseurl = import.meta.env.VITE_BACKEND_BASE_URL;
    const socket = io(baseurl);

    socket.emit("join-room", {
      userId: "dogesh123",
      roomid: roomId,
      username: "dogesh",
      email: "dogesh@gmail.com",
    });

    socket.on("existing-players", (players) => {
      console.log(players);
      setusers(players);
    });

    socket.on("user-joined", (data) => {
      setusers((prev) => [...prev, data]);
    });

    socket.on("players-update",(players) => {
      setusers(players);
    })

    return () => {
      socket.disconnect();
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[95%] h-[80%] border-6 border-gray-600 p-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${user.x}px`,
              top: `${user.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="text-sm font-semibold mb-1">{user.name}</div>
            <div className={`w-10 h-10 rounded-full bg-red-500 shadow-md`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gamepage;
