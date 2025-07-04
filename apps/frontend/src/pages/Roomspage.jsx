import axios from "axios";
import React, { useEffect, useState } from "react";
import { createRoom } from "../../helpers/room";

function Roomspage() {
  const [rooms, setrooms] = useState([]);
  const [fetchUser, setfetchUser] = useState(false);

  const fetchRooms = async () => {
    const res = await axios.get(
      "https://metaverse-backend-m3pe.onrender.com/getrooms/bahu 123"
    );
    setrooms(res.data.rooms);
    setfetchUser(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (!fetchUser) return;
    fetchRooms();
  }, [fetchUser]);

  const createRoomforuser = async () => {
    const response = await createRoom("bahu 2", "bahu 123", "bahu 456@gmail.com");
    setfetchUser(true);
  };

  return (
    <div className="w-full h-full p-4">
      <p className="text-3xl text-center mb-4">Welcome to Metaverse</p>
      {fetchUser ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full px-20">
          <div>
            <button
              onClick={() => createRoomforuser()}
              className="h-auto w-auto p-3 bg-red-300 text-white rounded-lg cursor-pointer hover:bg-red-600"
            >
              Create Room
            </button>
          </div>
          <div className="mx-auto grid grid-cols-3 gap-4 mt-56">
            {rooms.map((room) => (
              <div
                key={room}
                className="bg-gray-200 p-4 rounded-lg shadow hover:bg-gray-300 transition cursor-pointer"
              >
                Room {room.username}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Roomspage;
