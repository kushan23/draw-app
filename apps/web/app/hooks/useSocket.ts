import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket () {
    const [loading,setLoading]  = useState(true);
    const [socket,setSocket] = useState<WebSocket>();

    useEffect( () => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZTE0MzAwNi0zZjU4LTQ5OWEtOTZkZi0zOWI5OGNhOWMxNDEiLCJpYXQiOjE3NDIzMTUwMDB9.INQ3lKB0diUOOJoo8n07EgrrO3cThZ2ve6h5ZJ1s_UI`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
            console.log(ws);
        }
    }, [])
    return {
        socket,
        loading
    }
}