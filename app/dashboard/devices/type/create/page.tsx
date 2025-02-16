import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { postData } from "@/lib/server-actions";
import { redirect } from "next/navigation";

interface DeviceType {
  name: string;
  description: string;
}

export default async function CreateDeviceTypePage() {
  async function createDeviceType(formData: FormData) {
    "use server";

    const deviceType: DeviceType = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || "",
    };

    const response = await postData("/iot/device-types/", deviceType);

    if (!response) {
      throw new Error("No response received");
    }

    if (response.ok) {
      const { id } = await response.json();
      redirect(`/dashboard/devices/type/${id}`);
    } else {
      throw new Error("Failed to create Device Type");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form className="space-y-6" action={createDeviceType}>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create Device Type
          </h1>
          <p className="text-sm text-muted-foreground">
            Add a new device type to the system
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Smart AC" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Smart Air Conditioner"
            className="min-h-[100px]"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Create Device Type</Button>
        </div>
      </form>
    </div>
  );
}
