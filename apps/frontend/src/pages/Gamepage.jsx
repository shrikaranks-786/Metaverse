import React, { useDebugValue, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

function Gamepage() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const roomId = pathSegments[2];

  const [users, setusers] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 }); // Fixed typo
  const socketRef = useRef(null);

  useEffect(() => {
    // Move handleKeydown inside useEffect to avoid stale closure issues
    const handleKeydown = (e) => {
      console.log("Key pressed:", e.key);
      setPosition((prev) => {
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
          case "W":
            z += step;
            break;
          case "s":
          case "S":
            z -= step;
            break;
          default:
            return prev;
        }

        const newPos = { x, y, z };
        if (socketRef.current) {
          socketRef.current.emit("move", newPos);
        }
        return newPos;
      });
    };

    // Add event listener
    window.addEventListener("keydown", handleKeydown);
    
    // Ensure the window has focus (optional, but can help)
    window.focus();

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []); // Empty dependency array since handleKeydown is now inside

  useEffect(() => {
    const baseurl = import.meta.env.VITE_BACKEND_BASE_URL;
    const socket = io(baseurl);
    socketRef.current = socket;

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

    socket.on("players-update", (players) => {
      setusers(players);
    });

    return () => {
      socket.disconnect();
      // Removed duplicate keydown cleanup
    };
  }, [roomId]); // Added roomId as dependency

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