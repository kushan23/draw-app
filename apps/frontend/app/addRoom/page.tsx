"use client"
import { X } from "lucide-react";
import axios from "axios";
import { useRef, useState } from "react"
import { useRouter } from 'next/navigation'
import { BACKEND_URL } from "../config";
export default function Modal () {
  const roomnameref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function createRoom() {
    console.log("HELLO I AM HERE")
      const token = localStorage.getItem('token')
      console.log(token);
      const roomname = roomnameref.current?.value
      console.log(roomname);
      console.log("Roomname above me");
      try {
        const response = await axios.post(
          `${BACKEND_URL}/room`,  
          {
            // Your request body
            name: roomname
          },
          {
            headers: {
              'Authorization': `${token}`,   
              'Content-Type': 'application/json'
            }
          }
        );
        const res = response;
        const roomId = res.data.roomId;
        const url =  `/canvas/${roomId}`;
        console.log(url)
        router.push(url);
        console.log("hello");
    
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
  }

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg dark:bg-gray-700 w-full max-w-md p-5">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create a room
              </h3>
            </div>
            
            <div className="py-4">
                <div>
                  <label className="block mb-2 text-sm font-large text-gray-900 dark:text-white">
                    NAME
                  </label>
                  <input
                    type="text"
                    placeholder="MyRoom"
                    ref={roomnameref}
                    required
                    className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => createRoom()}
                  className="w-full bg-blue-700 text-white py-2.5 rounded-lg text-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Create
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <button 
                   className="text-blue-700 hover:underline dark:text-blue-500">
                  Create account
                  </button>
                </div>
            </div>
          </div>
        </div>
    
    
  );
};

