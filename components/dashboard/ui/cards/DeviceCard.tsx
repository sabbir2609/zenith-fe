import Link from 'next/link';

interface DeviceCardProps {
    device: {
        id: string;
        name: string;
        device_type: string;
        location: string;
        status: boolean;
    };
}

export default function DeviceCard({ device }: DeviceCardProps) {
    return (
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
    );
}