import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { fetchData, postData } from "@/lib/server-actions";

interface DeviceType {
  id: number;
  name: string;
  description?: string;
}

interface QoSChoice {
  value: number;
  label: string;
}

interface CreateDevice {
  name: string;
  client_id: string;
  qos: string;
  status: boolean;
  description: string;
  installation_date: string;
  device_type: number;
}

export default async function CreateDevicePage() {
  const deviceTypes = (await fetchData("/iot/device-types/")) as DeviceType[];
  const qosChoices = (await fetchData(
    "/iot/devices/qos_choices/"
  )) as QoSChoice[];

  if (!deviceTypes || !qosChoices) {
    return <Loading />;
  }

  async function createDevice(formData: FormData) {
    "use server";

    const device: CreateDevice = {
      name: formData.get("name") as string,
      client_id: formData.get("client_id") as string,
      qos: formData.get("qos") as string,
      status: Boolean(formData.get("status")),
      description: (formData.get("description") as string) || "",
      installation_date: formData.get("installation_date") as string,
      device_type: parseInt(formData.get("device_type") as string, 10),
    };

    const response = await postData("/iot/devices/", device);

    if (!response) {
      throw new Error("No response from server");
    }

    if (response.ok) {
      const { id } = await response.json();
      redirect(`/dashboard/devices/${id}`);
    } else {
      throw new Error("Failed to create Device");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form className="space-y-6" action={createDevice}>
        {/* Basic Info Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Add a Device
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details to create a new device
          </p>
        </div>

        {/* Name and Client ID */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Smart AC" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client_id">Client ID</Label>
            <Input
              id="client_id"
              name="client_id"
              placeholder="client_id"
              required
            />
          </div>
        </div>

        {/* QoS and Device Type */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="qos">QoS</Label>
            <Select name="qos" required>
              <SelectTrigger>
                <SelectValue placeholder="Select QoS" />
              </SelectTrigger>
              <SelectContent>
                {qosChoices.map((choice) => (
                  <SelectItem
                    key={choice.value}
                    value={choice.value.toString()}
                  >
                    {choice.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="device_type">Device Type</Label>
            <Select name="device_type" required>
              <SelectTrigger>
                <SelectValue placeholder="Select Device Type" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Installation Date */}
        <div className="space-y-2">
          <Label htmlFor="installation_date">Installation Date</Label>
          <Input
            id="installation_date"
            name="installation_date"
            type="date"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter device description"
            className="min-h-[100px]"
          />
        </div>

        {/* Status and Submit */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="status" name="status" />
            <Label htmlFor="status">Active Status</Label>
          </div>
          <Button type="submit">Create Device</Button>
        </div>
      </form>
    </div>
  );
}
