"use client"
import { useEffect,useRef, useState } from "react"
import { Draw } from "@/draw";
import { Canvas } from "./Canvas";
import { WS_URL } from "../config";
export function Room({roomId}: {roomId: string}){
    const [socket, setSocket] = useState<WebSocket | null>(null);

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
    if(!socket){
        return<div>
            Loading,connecting to server ....
        </div>
    }
    return <div>
        <Canvas roomId={roomId} socket={socket}></Canvas>
    </div>
}   