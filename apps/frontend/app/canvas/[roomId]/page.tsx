import { Room } from "@/app/components/Room";
export default async function CanvasPage( {params}: {
    params: {
        roomId: string
    }
}) 

{
    const roomId =(await params).roomId
    console.log(roomId);
    return <Room roomId={roomId} />
}