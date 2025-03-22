import { useEffect,useRef, useState } from "react"
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";


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
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <Bar setTool={setcurrentTool} tool={currentTool}/>
    </div>
}
function Bar({tool,setTool} : {
    tool: Shape,
    setTool: (s: Shape) => void
}) {
    return <div style={{
        position: 'fixed',
        top: 10,
        left:650
    }}>
        <div className="flex pl-2">
        <IconButton activated={tool === "pencil"} icon={<Pencil/>} onClick={() =>{setTool("pencil")}}></IconButton>
        <IconButton activated={tool ==="rect"} icon={<RectangleHorizontalIcon/>} onClick={() => {setTool("rect")}}></IconButton>
        <IconButton activated={tool ==="ellipse"} icon={<Circle/>} onClick={() =>{setTool("ellipse")}}></IconButton>
        </div>
    </div>
}