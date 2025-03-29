"use client"
import { useEffect,useRef, useState } from "react"
import { Canvas } from "./Canvas";
import { WS_URL } from "../config";
import { useRouter } from 'next/navigation'
export function Room({roomId}: {roomId: string}){
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const router = useRouter();


    useEffect(() => {
        const token = localStorage.getItem('token');
        const ws = new WebSocket(`${WS_URL}?${token}`);
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

        <Canvas roomId={roomId} socket={socket}></Canvas>
        </div>

    </div>
}   