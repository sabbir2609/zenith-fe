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
        <div className="grid grid-cols-2 gap-2">
            {overview.map((item, index) => (

                <div key={index} className="bg-accent">
                    <div className="p-2">
                        <p className="font-bold">{item.title}</p>
                        <p className="text-3xl font-bold">{item.value}</p>
                        <p className="text-sm">View Details</p>
                    </div>
                </div>
            ))}
        </div>
    )
}