import { postData } from "@/lib/server-actions";
import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Floor } from "@/lib/types";
import FloorForm from "@/components/dashboard/forms/floor-from";

export default function Page() {
  async function createFloor(formData: FormData) {
    "use server";

    const floorLevel = Number(formData.get("level"));

    const floor: Floor = {
      level: floorLevel,
      is_elevator_accessible: formData.get("is_elevator_accessible") === "true",
      description: formData.get("description") as string,
    };

    const response = await postData("main/floors/", floor);

    if (response.ok) {
      const { id } = await response.json();
      redirect(`/dashboard/floors/${id}?created=true`);
    } else {
      // Check if error is because floor already exists
      const errorData = await response.json();

      if (errorData.level && errorData.level[0]?.includes("already exists")) {
        redirect(`/dashboard/floors/${floorLevel}?exists=true`);
      }

      // If we get here, it's a different error
      throw new Error("Failed to create Floor");
    }
  }

  return (
    <div className="flex items-center justify-center p-6">
      <Card className="w-full md:w-4/5 lg:w-3/4">
        <CardHeader>
          <CardTitle>Add New Floor</CardTitle>
          <CardDescription>
            Create a new floor for your building
          </CardDescription>
        </CardHeader>
        <FloorForm createFloor={createFloor} submitLabel="Create Floor" />
      </Card>
    </div>
  );
}
