interface deviceType {
    id: string;
    name: string;
    description: string;
}

export default async function Page() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/iot/device-types/`);
        const data = await response.json();

        if (response.status === 404) {
            return (
                <h1 className="text-red-500">Not Found</h1>
            );
        }

        const deviceTypes: deviceType[] = data.results;

        return (
            <div className="grid content-center">
                <h1 className="text-2xl font-bold mb-4 ms-4">All Device Types</h1>

                {/* device types */}
                <ul>
                    {deviceTypes.map((deviceType) => (
                        <li key={deviceType.id} className="p-4">
                            <div className="rounded-lg shadow-md p-4">
                                <h2 className="text-xl font-bold">{deviceType.name}</h2>
                                <p>{deviceType.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } catch (error) {
        return (
            <h1 className="text-red-500">Error fetching device type list</h1>
        );
    }
}