import { LineChart } from "lucide-react";
import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated
}:{
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}) {
    return <div className={`pointer m-2 rounded-full border p-2 hover:bg-amber-300 ${activated? "text-red-400" : "text-white"}`}
    onClick={onClick}>
        {icon}
    </div>
}
