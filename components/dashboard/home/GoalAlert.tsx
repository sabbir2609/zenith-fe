import { Info } from "lucide-react";

export default function GoalAlert() {
    return (
        <div role="alert" className="alert rounded-sm shadow-md">
            <div className="bg-primary p-2 rounded-full shadow-lg">
                <Info size={26} className="text-white" />
            </div>

            <div>
                <h3 className="font-bold capitalize">You have reached your goal this month !</h3>
                <div className="text-xs">Check your goals and make new ones for next month </div>
            </div>
            <button className="btn btn-sm rounded-full shadow-md">Ok, got it.</button>
        </div>
    )
}