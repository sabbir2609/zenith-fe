interface Topic {
    id: number;
    name: string;
    description: string;
}

interface Device {
    id: string;
    name: string;
    device_type: number;
    client_id: string;
    status: boolean;
    qos: number;
    description: string;
    topics?: Topic[];
}

export default async function Page({ params }: { params: { id: number } }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/iot/devices/${params.id}`, {
            cache: "no-cache",
        });

        if (response.status === 404) {
            throw new Error("Device not found");
        }

        const device: Device = await response.json();

        return (
            <div className="border border-primary rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold font-mono mb-4 text-primary">
                    Name: {device.name}
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <p className="font-semibold font-mono">Type:</p>
                    <p>{device.device_type}</p>
                    <p className="font-semibold font-mono">Client ID:</p>
                    <p>{device.client_id}</p>
                    <p className="font-semibold font-mono">Status:</p>
                    <p className={device.status ? "text-green-600" : "text-red-600"}>
                        {device.status ? "On" : "Off"}
                    </p>
                    <p className="font-semibold font-mono">QoS:</p>
                    <p>{device.qos}</p>
                    <p className="font-semibold font-mono">Description:</p>
                    <p>{device.description}</p>
                </div>

                <div className="overflow-x-auto">
                    <h3 className="text-lg font-light font-mono mb-2">Topics:</h3>
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {device.topics?.map((topic, index) => (
                                <tr key={topic.id}>
                                    <th>{index + 1}</th>
                                    <td>{topic.name}</td>
                                    <td>{topic.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        );
    } catch (error) {
        return (
            <h1 className="text-red-500 p">
                {(error as Error).message == "fetch failed" ? "Error fetching device details" : "Device not found"}
            </h1>
        );
    }
}