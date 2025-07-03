import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";

function Authpage() {
  const [isLogin, setisLogin] = useState(true);
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-200">
      <div className="w-[450px] h-auto max-h-[500px] bg-white flex flex-col items-center rounded-lg py-5">
        <div className="mt-3 text-center mb-8">
          <p className="font-bold text-xl">Welcome Back</p>
          <p className="text-gray-400 text-md">
            Enter Your credentials to get started
          </p>
        </div>

        {!isLogin && (
          <div className="flex flex-col items-center h-24 w-full">
            <div className="w-[83%] flex justify-start mb-1">
              <span className="text-sm text-gray-500">User Name</span>
            </div>
            <div className="w-[83%] h-12 border border-gray-300 flex space-x-2 justify-center items-center rounded-md">
              <CiUser className="ml-2 w-6 h-6" />
              <input
                type="text"
                placeholder="User Name"
                className="w-full h-full"
                style={{ border: "none", outline: "none" }}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col items-center h-24 w-full">
          <div className="w-[83%] flex justify-start mb-1">
            <span className="text-sm text-gray-500">Email</span>
          </div>
          <div className="w-[83%] h-12 border border-gray-300 flex space-x-2 justify-center items-center rounded-md">
            <CiMail className="ml-2 w-6 h-6" />
            <input
              type="text"
              placeholder="Email"
              className="w-full h-full"
              style={{ border: "none", outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center h-24 w-full">
          <div className="w-[83%] flex justify-start mb-1">
            <span className="text-sm text-gray-500">Password</span>
          </div>
          <div className="w-[83%] h-12 border border-gray-300 flex space-x-2 justify-center items-center rounded-md">
            <RiLockPasswordFill className="ml-2 w-6 h-6" />
            <input
              type="text"
              placeholder="Password"
              className="w-full h-full"
              style={{ border: "none", outline: "none" }}
            />
          </div>
        </div>

        {isLogin ? (
          <div className="flex flex-col items-center space-y-2">
            <button className="w-auto h-auto py-1 px-5 rounded-md bg-blue-500 cursor-pointer">
              Login
            </button>
            <div className="inline-block space-x-1">
              <span>Dont have an account</span>
              <span
                className="text-blue-300 cursor-pointer"
                onClick={() => setisLogin(!isLogin)}
              >
                Signup
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <button className="w-auto h-auto py-1 px-5 rounded-md bg-blue-500 cursor-pointer">
              SignUp
            </button>
            <div className="inline-block space-x-1">
              <span>Have an account</span>
              <span
                className="text-blue-300 cursor-pointer"
                onClick={() => setisLogin(!isLogin)}
              >
                Login
              </span>
            </div>
          </div>
        )}
        <div />
      </div>
    </div>
  );
}

export default Authpage;
