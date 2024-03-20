import { Button } from "@/components/dashboard/ui";

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

async function deleteDevice(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/iot/devices/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",

        },
    });

    if (response.status === 200) {
        window.location.href = "/dashboard/devices";
    }
}

export default async function Page({ params }: { params: { id: string } }) {
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
                    Name: {device.name} {device.status ? <div className="badge badge-success badge-xs"></div> : <div className="badge badge-error badge-xs"></div>}
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <p className="font-semibold font-mono">Type:</p>
                    <p>{device.device_type}</p>
                    <p className="font-semibold font-mono">Client ID:</p>
                    <p>{device.client_id}</p>
                    <p className="font-semibold font-mono">Status:</p>
                    <p className={device.status ? "text-green-600" : "text-red-600"}>{device.status ? "Active" : "Inactive"}</p>
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

                <Button onClick={() => deleteDevice(device.id)} className="btn btn-error" type="button">
                    Delete
                </Button>

            </div>

        );
    } catch (error) {
        return (
            <div className="flex items-center justify-center">
                <div className="rounded-lg p-40 shadow-lg text-center">
                    <h1 className="text-3xl font-bold text-red-600">
                        {(error as Error).message == "fetch failed" ? "Error fetching device details" : "Device not found ! "}
                    </h1>
                </div>
            </div>
        );
    }
}