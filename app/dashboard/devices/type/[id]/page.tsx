import { Fetch } from "@/app/lib";
import Loading from "@/app/loading";

interface DeviceType {
    name: string;
    description: string;
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await Fetch({ endpoint: `iot/device-types/${params.id}` });

    const deviceType: DeviceType = data;

    return (
        <div className="flex flex-col p-5">
            <h1 className="text-3xl font-bold mb-5">Details:</h1>
            <h1 className="text-2xl font-semibold">Device Type: {deviceType.name}</h1>
            <p className="text-lg font-light">
                Description: <span>
                    {
                        deviceType.description && deviceType.description.length > 0 ? deviceType.description : 'No description provided'
                    }
                </span>
            </p>
        </div>
    );
}