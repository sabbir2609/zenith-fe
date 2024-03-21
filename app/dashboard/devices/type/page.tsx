interface deviceType {
    id: string;
    name: string;
    description: string;
}

export default async function Page() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/iot/device-types/`, {
            cache: "no-cache",
        });
        const data = await response.json();

        if (response.status === 404) {
            return (
                <h1 className="text-red-500">Not Found</h1>
            );
        }

        const deviceTypes: deviceType[] = data;

        if (deviceTypes && deviceTypes.length === 0) {
            return (
                <div className="flex items-center justify-center">
                    <div className="rounded-lg shadow-lg p-5 md:p-20 mx-2">
                        <h1 className="text-red-500 text-center">No device types found</h1>
                        <h2 className="text-blue-500 text-center">Please add a device type</h2>
                    </div>
                </div>
            );
        }

        return (
            <div className="grid content-center">
                <h1 className="text-2xl font-bold mb-4 ms-4">All Device Types</h1>

                {/* device types */}
                <ul>
                    {deviceTypes && deviceTypes.map(({ id, name, description }) => (
                        <li key={id} className="p-4">
                            <div className="rounded-lg shadow-md p-4">
                                <h2 className="text-xl font-bold">{name}</h2>
                                <p>{description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } catch (error) {
        return (
            <>
                <h1 className="text-red-500">Error fetching device type list</h1>
                {(error as Error).message}
            </>
        );
    }
}