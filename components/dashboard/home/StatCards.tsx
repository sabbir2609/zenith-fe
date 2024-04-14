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
            title: "reserved",
            value: 3,
            url: "/dashboard/reserved"
        }
    ]

    return (
        <div className="grid grid-cols-2 gap-2 h-full">
            {overview.map((item, index) => (
                <div key={index} className="bg-accent rounded-sm p-4 shadow-md flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold">{item.title}</p>
                            <p className="text-4xl font-bold mt-4">{item.value}</p>
                        </div>
                        <Link href={item.url} className="text-sm self-start text-secondary">View All</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}