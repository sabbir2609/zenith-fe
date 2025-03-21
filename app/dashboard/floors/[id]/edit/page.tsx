import { fetchData, patchData } from "@/lib/server-actions";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import FloorForm from "@/components/dashboard/forms/floor-from";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const floor = await fetchData(`main/floors/${id}`);

  async function updateFloor(formData: FormData) {
    "use server";

    const updatedFloor = {
      level: Number(formData.get("level")),
      is_elevator_accessible: formData.get("is_elevator_accessible") === "true",
      description: formData.get("description") as string,
    };

    const response = await patchData(`main/floors/${id}/`, updatedFloor);

    if (response && response.ok) {
      redirect(`/dashboard/floors/${id}`);
    } else {
      throw new Error("Failed to update floor");
    }
  }

  return (
    <div className="flex items-center justify-center p-6">
      <Card className="w-full md:w-4/5 lg:w-3/4">
        <CardHeader>
          <CardTitle>Edit Floor</CardTitle>
          <CardDescription>Update the floor information</CardDescription>
        </CardHeader>

        <FloorForm
          updateFloor={updateFloor}
          initialData={{
            level: floor.level,
            is_elevator_accessible: floor.is_elevator_accessible,
            description: floor.description,
          }}
          submitLabel="Update Floor"
        />
      </Card>
    </div>
  );
}
