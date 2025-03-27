import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FloorForm from "@/components/dashboard/forms/floor-from";
import { postData } from "@/lib/server-actions";
import { Floor } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function Page() {
  async function createFloor(formData: FormData) {
    "use server";
    const res = await postData("main/floors/", {
      body: formData,
    });
    const resData: Floor = await res.json();
    if (res.ok) {
      redirect(`/dashboard/floors/${resData.level}?created=true`);
    } else {
      throw new Error("Failed to create floor");
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
