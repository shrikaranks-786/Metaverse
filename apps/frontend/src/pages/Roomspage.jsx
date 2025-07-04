import React from "react";

function Roomspage() {
  const rooms = [1, 2, 3, 4];
  return (
    <div className="w-full h-full p-4">
      <p className="text-3xl text-center mb-4">Welcome to Metaverse</p>
      <div className="w-full px-20">
        <div>
          <button className="h-auto w-auto p-3 bg-red-300 text-white rounded-lg cursor-pointer hover:bg-red-600">
            Create Room
          </button>
        </div>
        <div className="mx-auto grid grid-cols-3 gap-4 mt-56">
          {rooms.map((room) => (
            <div
              key={room}
              className="bg-gray-200 p-4 rounded-lg shadow hover:bg-gray-300 transition cursor-pointer"
            >
              Room {room}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Roomspage;
