import { DeviceCard, Pagination } from "@/components/dashboard/common";

interface Device {
    id: string;
    name: string;
    device_type: string;
    client_id: string;
    location: string;
    status: boolean;
}

export default async function Page() {
    const totalPages = 50;

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/iot/devices/`);
    const data = await response.json();

    if (!response.ok) {
        return (
            <h1 className="text-red-500">Error fetching device list</h1>
        );
    }

    const devices: Device[] = data.results;

    return (
        <div className="grid content-center">
            <h1 className="text-2xl font-bold mb-4 ms-4">All Devices</h1>

            {/* devices */}
            <ul>
                {devices.map((device) => (
                    <li key={device.id} className="p-4">
                        <DeviceCard device={device} />
                    </li>
                ))}
            </ul>

            {/* pagination */}
            <div className="flex justify-center">
                <Pagination totalPages={totalPages} />
            </div>

        </div>
    )
}