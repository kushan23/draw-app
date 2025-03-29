import { useEffect,useRef, useState } from "react"
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon, LogOut, LogOutIcon} from "lucide-react";
import { useRouter } from 'next/navigation'
import { Game } from "@/draw/Game";
import { Socket } from "dgram";


export type Tool = "ellipse" | "rect" | "pencil";

type Shape = "ellipse" | "rect" | "pencil";

export function Canvas({
    roomId,
    socket
}: {
    roomId: string;
    socket: WebSocket;
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game,setGame] = useState<Game>();
    const [currentTool,setcurrentTool] = useState<Tool>("rect");
    const router = useRouter();
    useEffect(() => {
        game?.setTool(currentTool);
    }, [currentTool, game]);
    

    useEffect(() => {
        if (canvasRef.current){
            const newGame = new Game(canvasRef.current,roomId, socket);
            setGame(newGame);

            return () => {
                newGame.destroy();
            }
        }
    }, [canvasRef]);
   
    return <div style={{
        height: "100vh",
        background: 'black',
        overflow: "hidden"
    }}>
        <Bar setTool={setcurrentTool} tool={currentTool} roomId={roomId} socket={socket} router={router}/>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>
}


function Bar({tool,setTool,roomId,socket,router} : {
    tool: Shape,
    setTool: (s: Shape) => void,
    roomId: string;
    socket: WebSocket;
    router: any
}) {
                        function leaveRoom(roomId: string,socket: WebSocket,router: any){
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
    return <div style={{
        position: 'fixed',
        top: 50,
        left:630
    }}>
        <div className="flex justify-center pl-2">
        <IconButton activated={tool === "pencil"} icon={<Pencil/>} onClick={() =>{setTool("pencil")}}></IconButton>
        <IconButton activated={tool ==="rect"} icon={<RectangleHorizontalIcon/>} onClick={() => {setTool("rect")}}></IconButton>
        <IconButton activated={tool ==="ellipse"} icon={<Circle/>} onClick={() =>{setTool("ellipse")}}></IconButton>
        <IconButton activated={false} icon={<LogOutIcon/>} onClick={() =>leaveRoom(roomId,socket,router)}></IconButton>
    </div>
    </div>
    
}