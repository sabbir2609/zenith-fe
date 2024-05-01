import { Post } from "@/app/lib";
import Loading from "@/app/loading";
import { Input, TextArea } from "@/components/dashboard/ui";
import { redirect } from "next/navigation";

interface DeviceType {
    name: string;
    description: string;
}

export default async function CreateDeviceTypePage() {
    async function createDeviceType(formData: FormData) {
        'use server'

        const deviceType: DeviceType = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
        };

        const response = await Post('iot/device-types/', deviceType);

        if (!response) {
            <Loading />
        }

        if (response.ok) {
            const { id } = await response.json();
            console.log('Device Type created successfully');
            redirect(`/dashboard/devices/type/${id}`)
        } else {
            console.error('Failed to create Device Type');
            throw new Error('Failed to create Device Type');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <form action={createDeviceType} className="space-y-2 p-2 w-full lg:w-2/3">
                <h1 className="text-2xl font-semibold">Create Device Type</h1>
                <Input name="name" type="text" label="Name" placeholder="Smart AC" />
                <TextArea name="description" label="Description" placeholder="Smart Air Conditioner" />
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-md btn-primary rounded-sm mt-3">Create</button>
                </div>
            </form>
        </div>
    );
}