import { Fetch } from "@/app/lib";
import { Pagination } from "@/components/dashboard/common";
import { FileSymlink } from "lucide-react";
import Link from "next/link";


interface Device {
    id: string;
    name: string;
    device_type: string;
    client_id: string;
    location: string;
    status: boolean;
}

export default async function Page(context: any) {
    const pageNumber = context.searchParams.page ? context.searchParams.page : 1;

    const baseURL = '/dashboard/devices';

    const data = await Fetch({ endpoint: `iot/devices/?page=${pageNumber}` });

    const totalDevices = data.count;
    const activeDevices = data.active_devices_count;

    const totalPages = Math.ceil(totalDevices / 10);

    const devices: Device[] = data.results;

    return (
        <div className="flex flex-col">
            {/* header */}
            {devices.length === 0 && (
                <div className="card text-white">
                    <div className="card-body">
                        <h2 className="card-title text-5xl">No device available!</h2>
                        <p className="text-xl">Please Add Device</p>
                        <div className="card-actions justify-end">
                            <Link href="/dashboard/devices/add">
                                <button className="btn btn-primary">Add Device</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 px-2 pb-2">
                <div>
                    <h1 className="text-2xl font-semibold whitespace-nowrap">Device List</h1>
                    <div className="flex flex-wrap md:gap-2 lg:gap-2">
                        <p className="font-normal">
                            Total Devices: <span className="text-primary">{totalDevices}</span>
                        </p>
                        <p className="font-normal whitespace-nowrap"> Active Devices: <span className="text-primary">{activeDevices}</span>
                        </p>
                    </div>
                </div>
                <div className="justify-self-end">
                    <Link href="/dashboard/devices/new" className="btn btn-sm rounded-sm btn-primary">
                        New Device
                    </Link>
                </div>
            </div>

            {/* devices */}
            <div className="overflow-x-auto mb-16">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Device Type</th>
                            <th>Client ID</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device: Device) => (
                            <tr key={device.id} className="hover">
                                <td>
                                    <Link className="text-blue-800 hover:underline hover:text-blue-500" href={`/dashboard/devices/${device.id}`}>
                                        {device.id}
                                    </Link>
                                </td>
                                <td className="whitespace-nowrap">{device.name}</td>
                                <td>{device.device_type}</td>
                                <td>{device.client_id}</td>
                                <td className="whitespace-nowrap">{device.location}</td>
                                <td>{device.status ? "Active" : "Inactive"}</td>
                                <td>
                                    <div className="flex items-center space-x-2">
                                        <Link className="hover:underline hover:text-blue-700" href={`/dashboard/devices/${device.id}`}>
                                            <FileSymlink />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* pagination */}
            {totalPages > 1 && (
                <div className="fixed bottom-4 right-4">
                    <Pagination baseURL={baseURL} totalPages={totalPages} />
                </div>
            )}

        </div>
    )
} 