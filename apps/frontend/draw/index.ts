import axios from 'axios';
import { BACKEND_URL } from "@/app/config";
type Shape = {
    type: "rect",
    x: number,
    y: number;
    height: number;
    width: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
export async function Draw (canvas  :HTMLCanvasElement, roomId: string, socket: WebSocket ) {
        const context = canvas.getContext("2d");
        let currentShapes: Shape[] = await getShapes(roomId);
        if (!context){
            return;
        }

        // context.fillStyle = "rgba(0,0,0)"
        // context.fillRect(0,0,canvas.width,canvas.height)

        if(!socket){
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if(message.type == "chat"){
                const parsed = JSON.parse(message.message);
                currentShapes.push(parsed.shape);
                clearCanvas(currentShapes,canvas,context);
            }
        }
    
        clearCanvas(currentShapes,canvas,context)
        let click = false;
        let startX = 0;
        let startY = 0; 

        canvas.addEventListener("mousedown", (e) => {
            click = true;
            startX = e.clientX;
            startY = e.clientY;
        })

        canvas.addEventListener("mouseup", (e) => {
            click = false;
            const width = e.clientX - startX;
            const height = e.clientY - startY;

            //@ts-ignore
            const currentTool = window.tool
            let shape: Shape | null = null;
            if (currentTool === "rect"){
             shape = {
                //@ts-ignore
                type: "rect",
                x: startX,
                y: startY,
                height,
                width
            }
        }
        else if (currentTool === "circle"){
            const radius = Math.max(width,height) / 2;
            shape = {
                type: "circle",
                centerX: startX + radius,
                centerY: startY + radius,
                radius: Math.abs(radius)
        }
    }
    if(!shape){
        return
    }
    currentShapes.push(shape);
    
            try {
            socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({
                    shape
                }),
                roomId
            }))
        }
        catch(e){
            console.log(e);
        }
        })

        canvas.addEventListener("mousemove",(e) => {
            if(click) {
                const width = e.clientX - startX;
                const height = e.clientY - startY;
                clearCanvas(currentShapes,canvas,context);
                context.strokeStyle = "rgba(255,255,255)"
                //@ts-ignore
                const currentTool = window.tool;
                if(currentTool === "rect" ){
                context.strokeRect(startX,startY,width,height);
                }
                else if( currentTool === "circle"){
                    const centerX = startX + width;
                    const centerY = startY + height;
                    const radius = Math.max(width,height) / 2;
                    context.beginPath();
                    context.arc(centerX,centerY,radius,0,Math.PI*2);
                    context.stroke();
                    context.closePath();
                }

            }
        })
    
        function clearCanvas(currentShapes: Shape[],canvas: HTMLCanvasElement, context: CanvasRenderingContext2D){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.fillStyle = "rgba(00,0,0)"
            context.fillRect(0,0,canvas.width,canvas.height);

            currentShapes.map((shape) => {
                if( shape.type === "rect" ) {
                    context.strokeStyle = "rgba(255, 255, 255)"
                    context.strokeRect(shape.x,shape.y,shape.width,shape.height)
                }
                else if( shape.type === "circle"){
                    context.beginPath();
                    context.arc(shape.centerX,shape.centerY,shape.radius,0,Math.PI*2);
                    context.stroke();
                    context.closePath();
                }
            })
        }
        async function getShapes(roomId: string){
            const res = await  axios.get(`${BACKEND_URL}/chats/${roomId}`);
            const data = res.data.messages;
            const shapes = data.map((x: { message: string; }) => {
                const shapeData = JSON.parse(x.message);
                return shapeData.shape;
            })
            return shapes;
        }
        
    }
