"use client"
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'


export default function RoomPage() {
    const [room,setRooms] = useState([]);
    const router = useRouter();
    
    function onJoinRoom(roomId: string){
        console.log(roomId);
        const url =  `/canvas/${roomId}`;
        router.push(url)
    }
    function addRoom() {
        router.push('/addRoom')
    }
    async function getRooms(){
        const token = localStorage.getItem('token')
        const response = await axios.get(`${BACKEND_URL}/allrooms`,{
            headers:{
                Authorization: `${token}`
            }
        })
        setRooms(response.data.rooms)
    }
    useEffect( () => {
        getRooms();
    },[])
    console.log(room);
    console.log(room.length);
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-violet-600 mb-6 text-center">Available Rooms</h1>
        <div className="pb-5">
        <button
        onClick={() => addRoom()}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Add Room
      </button> 
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {room.length > 0 ? (
                room.map((room) => (
                    <div
                            key={room.id}
                            className="bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 transform hover:scale-105"
                        >
                            <h2 className="text-xl font-semibold text-blue-400 mb-2">
                                Room ID: {room.id}
                            </h2>
                            <p className="text-gray-300 mb-4">
                                Name: <span className="font-medium">{room.slug}</span>
                            </p>
                            
                            {/* Join Room Button */}
                            <button
                                onClick={() => onJoinRoom(room.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
                            >
                                Join Room
                            </button>
                        </div>
                ))
            ) : (
                <p className="text-center col-span-full text-gray-500">No rooms available.</p>
            )}
        </div>
    </div>
        
      );
    

    }
