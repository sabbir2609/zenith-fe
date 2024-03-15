import { Pagination } from "@/components/dashboard/common";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";


interface Device {
    id: string;
    name: string;
    type: string;
    location: string;
    status: boolean;
}


const deviceTypes = ["XC", "XF", "XT"];
const deviceNames = ["Light", "AC", "Thermostat"];
const floors = ["F11", "F12", "F13", "F14", "F15"];
const rooms = ["R1", "R2", "R3", "R4", "R5"];
const locations = ["BR", "LR", "DR", "KT", "BA"];

const devices: Device[] = Array(17).fill(0).map((_, index) => {
    const randomDeviceTypeIndex = Math.floor(Math.random() * deviceTypes.length);
    const randomFloorIndex = Math.floor(Math.random() * floors.length);
    const randomRoomIndex = Math.floor(Math.random() * rooms.length);
    const randomLocationIndex = Math.floor(Math.random() * locations.length);
    const status = Math.random() > 0.5;

    return {
        id: uuidv4(),
        name: `${deviceTypes[randomDeviceTypeIndex]}${index}`,
        type: deviceNames[randomDeviceTypeIndex],
        location: `${floors[randomFloorIndex]}${rooms[randomRoomIndex]}-${locations[randomLocationIndex]}`,
        status,
    };
});


export default function Page() {
    const totalPages = 50;

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
                                <p>Type: {device.type}</p>
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