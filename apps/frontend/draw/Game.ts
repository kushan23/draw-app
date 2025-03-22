import { Tool } from "@/app/components/Canvas"
import { getExistingSHapes } from "./GetShapes";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "ellipse";
    centerX: number,
    centerY: number,
    radX: number,
    radY: number
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[]
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "ellipse";

    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }
    
    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
    }

    setTool(tool: "ellipse" | "pencil" | "rect") {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingSHapes(this.roomId);
        console.log(this.existingShapes);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type == "chat") {
                const parsedShape = JSON.parse(message.message)
                this.existingShapes.push(parsedShape.shape)
                this.clearCanvas();
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255, 255, 255)"
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "ellipse") {
                this.ctx.beginPath()
                this.ctx.ellipse(shape.centerX, shape.centerY, shape.radX, shape.radY, 0 , 0  , 2* Math.PI);
                this.ctx.stroke();
            }
            else if ( shape.type === "pencil") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX,shape.startY);
                this.ctx.lineTo(shape.endX,shape.endY);
                this.ctx.stroke();
            }
        })
    }

    mouseDownHandler = (e: { clientX: number; clientY: number; }) => {
        this.clicked = true
        this.startX = e.clientX
        this.startY = e.clientY
    }
    mouseUpHandler = (e: { clientX: number; clientY: number; }) => {
        this.clicked = false
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;

        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            }
        } else if (selectedTool === "ellipse") {
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
            const radX = Math.abs(width / 2);
            const radY = Math.abs(height / 2);
            shape = {
                type: "ellipse",
                centerX,
                centerY,
                radX,
                radY,
            }
        }
        else if ( selectedTool === "pencil"){
            shape = {
                type: "pencil",
                startX: this.startX,
                startY: this.startY,
                endX: e.clientX,
                endY: e.clientY
            }
        }
        if (!shape) {
            return;
        }
        this.existingShapes.push(shape);
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId: this.roomId
        }))
    }
    mouseMoveHandler = (e: { clientX: number; clientY: number; }) => {
        if (this.clicked) {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            this.clearCanvas();
            this.ctx.strokeStyle = "rgba(255, 255, 255)"
            const selectedTool = this.selectedTool;
            console.log(selectedTool)
            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);   
            } else if (selectedTool === "ellipse") {
                const centerX = this.startX + width / 2;
                const centerY = this.startY + height / 2;
                const radX = Math.abs(width / 2);
                const radY = Math.abs(height / 2); 
                this.ctx.beginPath()
                this.ctx.ellipse(centerX, centerY, radX, radY, 0 , 0  , 2* Math.PI);
                this.ctx.stroke();
                this.ctx.closePath();               
            }
            else if (selectedTool === "pencil"){
                const x = e.clientX;
                const y = e.clientY;
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX,this.startY);
                this.ctx.lineTo(x,y);
                this.ctx.stroke();

            }
        }
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler)

        this.canvas.addEventListener("mouseup", this.mouseUpHandler)

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)    
    }
}