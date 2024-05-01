import { Fetch, Post } from "@/app/lib";
import Loading from "@/app/loading";
import { FormSelect, Input, TextArea } from "@/components/dashboard/ui";
import { redirect } from "next/navigation";

interface CreateDevice {
    name: string,
    client_id: string,
    qos: string,
    status: boolean,
    description: string,
    installation_date: string,
    device_type: number,
}



export default async function CreateDevicePage() {

    const deviceTypes = await Fetch({ endpoint: 'iot/device-types/' });
    const qosChoices = await Fetch({ endpoint: 'iot/devices/qos_choices/' });

    if (!deviceTypes || !qosChoices) {
        <Loading />
    }

    async function createDevice(formData: FormData) {
        'use server'

        const device: CreateDevice = {
            name: formData.get('name') as string,
            client_id: formData.get('client_id') as string,
            qos: formData.get('qos') as string,
            status: Boolean(formData.get('status')),
            description: formData.get('description') as string,
            installation_date: formData.get('installation_date') as string,
            device_type: formData.get('device_type') as unknown as number,
        };

        const response = await Post('iot/devices/', device);

        if (!response) {
            <Loading />
        }

        if (response.ok) {
            const { id } = await response.json();
            console.log('Device created successfully');
            redirect(`/dashboard/devices/${id}`)
        } else {
            console.error('Failed to create Device');
            throw new Error('Failed to create Device');
        }
    }

    return (
        <div className="flex items-center justify-center">
            <form className="space-y-2 p-2 w-full md:w-4/5 lg:w-3/4" action={createDevice}>

                <h1 className="text-2xl font-semibold">Add a Device</h1>

                <div className="flex flex-col md:flex-row lg:flex-row gap-2">
                    <Input name="name" type="text" label="Name" placeholder="Smart AC" required={true} />
                    <Input name="client_id" type="text" label="Client ID" placeholder="client_id" required={true} />
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row gap-2">
                    <FormSelect name="qos" options={qosChoices} label="QoS" required={true} />
                    <FormSelect name="device_type" options={deviceTypes} label="Device Type" required={true} />
                </div>

                <Input name="installation_date" type="date" label="Installation Date" required={true} />

                <TextArea name="description" label="Description" placeholder="Description" />

                <div className="flex justify-between px-2">
                    <label className="cursor-pointer form-control">
                        <div className="label">
                            <span className="label-text">Status</span>
                        </div>
                        <input name="status" value="1" type="checkbox" className="toggle toggle-primary" />
                    </label>
                    <button type="submit" className="btn btn-primary btn-md rounded-sm mt-3">Create</button>
                </div>
            </form>
        </div>
    );
}
