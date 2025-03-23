"use client"
import { useEffect,useRef, useState } from "react"
import { Canvas } from "./Canvas";
import { WS_URL } from "../config";
import { useRouter } from 'next/navigation'
export function Room({roomId}: {roomId: string}){
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const router = useRouter();


    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZTE0MzAwNi0zZjU4LTQ5OWEtOTZkZi0zOWI5OGNhOWMxNDEiLCJpYXQiOjE3NDI1NTEwOTd9.Ho1g6eOKrzUhyv1tk9gwgsQ6vN4XuKS96FMbrA4Jmlg`);
        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: "join_room",
                roomId
            });
            ws.send(data)
        }
    }, [])
    function leaveRoom(){
        const data = JSON.stringify({
            type: "leave_room",
            roomId
        });
        if(!socket){
            return 
        }
        socket.send(data);
        router.push('/rooms');
    }
    if(!socket){
        return<div>
            Loading,connecting to server ....
        </div>
    }
    return <div>
        <div className="flex-col">
        {/* <div className="flex justify-center">
            <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
            onClick={leaveRoom}> Leave room</button>
            

        </div> */}
        <Canvas roomId={roomId} socket={socket}></Canvas>
        </div>

    </div>
}   