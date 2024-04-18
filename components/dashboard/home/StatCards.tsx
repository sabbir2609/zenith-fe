import { View } from "lucide-react"
import Link from "next/link"

export default function StatCards() {

    const overview = [
        {
            title: "Occupied",
            value: 55,
            url: "/dashboard/occupied"
        },
        {
            title: "Available",
            value: 16,
            url: "/dashboard/available"
        },
        {
            title: "Preparing",
            value: 9,
            url: "/dashboard/total"
        },
        {
            title: "Reserved",
            value: 3,
            url: "/dashboard/reserved"
        }
    ]

    return (
        <div className="grid grid-cols-2 gap-2 h-full">
            {overview.map((item, index) => (
                <div key={index} className="rounded-sm p-4 shadow-md flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold">{item.title}</p>
                            <p className="text-4xl font-bold mt-4">{item.value}</p>
                        </div>
                        <Link href={item.url} className="self-start font-normal">
                            <View size={20} />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}