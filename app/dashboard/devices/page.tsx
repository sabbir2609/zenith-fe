import { Pagination } from "@/components/dashboard/common";
import Link from "next/link";


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
        <div className="p-4 grid content-center">
            <h1 className="text-2xl font-bold mb-4">All Devices</h1>

            {/* devices */}
            <ul className="space-y-4">
                {devices.map((device) => (
                    <li key={device.id} className="p-4">
                        <div className="card bordered shadow-md">
                            <div className="card-body">
                                <h2 className="text-2xl">{device.name}</h2>
                                <p>Type: {device.device_type}</p>
                                <p>Location: {device.location}</p>
                                <p>Status: {device.status ? "On" : "Off"}</p>
                                <div className="justify-end card-actions">
                                    <Link href={`/dashboard/devices/${device.id}`} className="btn btn-primary">
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
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