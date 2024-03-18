import { DeviceCard, Pagination } from "@/components/dashboard/common";

interface Device {
    id: string;
    name: string;
    device_type: string;
    client_id: string;
    location: string;
    status: boolean;
}

export default async function Page({ pageNumber = 1 }: { pageNumber: number }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/iot/devices/?page=${pageNumber}`, {
            cache: "no-cache",
        });
        const data = await response.json();

        if (!response.ok) {
            return (
                <h1 className="text-red-500">Error fetching device list</h1>
            );
        }

        const totalDevices = data.count;
        const activeDevices = data.results.filter((device: Device) => device.status === true);

        const totalPages = Math.ceil(totalDevices / 10);
        const devices: Device[] = data.results;

        return (
            <div className="grid content-center">
                {/* header */}
                <h1 className="text-2xl font-bold ms-4">All Devices</h1>
                <div className="text-lg font-semibold ms-4 gap-2">
                    <span className="font-normal">Total Devices:</span> <span className="text-secondary">{totalDevices}</span>
                    <span className="font-normal"> | </span>
                    <span className="font-normal">Active Devices:</span> <span className="text-secondary">{activeDevices.length}</span>
                </div>

                {/* devices */}
                <ul>
                    {devices.map((device) => (
                        <li key={device.id} className="p-4">
                            <DeviceCard device={device} />
                        </li>
                    ))}
                </ul>

                {/* pagination */}
                <div className="flex justify-center mb-2">
                    <Pagination totalPages={totalPages} />
                </div>


            </div>
        )
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