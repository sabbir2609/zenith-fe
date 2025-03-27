import { Edit, Trash, BedDouble, DollarSign } from "lucide-react";
import { fetchData, postData, patchData, deleteData } from "@/lib/server-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RoomType } from "@/lib/types";
import AddRoomType from "@/components/dashboard/room/roomtype-add";
import ToastHandler from "@/components/common/toast";
import RoomTypeDetail from "@/components/dashboard/room/roomtype-detail";
import { revalidatePath } from "next/cache";
import { DeleteButton } from "@/components/dashboard/common/delete-button";

export default async function Page() {
  const roomTypes: RoomType[] = await fetchData("main/room-types/");

  async function createRoomType(formData: FormData) {
    "use server";
    const data = {
      room_type: formData.get("room_type") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
    }
    await postData("main/room-types/", data);
    revalidatePath("dashboard/rooms/room-types");
  }

  async function deleteRoomType(
    id: number,
  ): Promise<void> {
    "use server";
    await deleteData(`main/room-types/${id}`);
    revalidatePath("dashboard/rooms/room-types");
  }

  return (
    <div className="flex flex-col gap-6">
      <ToastHandler />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Room Types</h1>
          <p className="text-muted-foreground mt-1">
            Manage available room types and their pricing
          </p>
        </div>
        <AddRoomType createRoomType={createRoomType} />
      </div>

      {roomTypes.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 flex flex-col items-center justify-center text-center">
            <BedDouble className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No room types found</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Create room types to define different accommodation options with
              unique amenities and pricing.
            </p>
            <AddRoomType createRoomType={createRoomType} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomTypes.map((roomType) => (
            <Card key={roomType.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">
                    {roomType.room_type}
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2 h-10">
                  {roomType.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />$
                  {roomType.price}
                  <Badge variant="outline" className="ml-auto font-normal">
                    Per Night
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between pt-1">

                <RoomTypeDetail roomType={roomType} />

                <div className="flex gap-2">

                  <Button variant="outline" size="sm" className="text-blue-500">
                    <Edit className="h-4 w-4" />
                  </Button>

                  <DeleteButton
                    onDelete={deleteRoomType(roomType.id)} // TODO: This is not working
                    itemName={roomType.room_type}
                  >
                    <Trash className="h-4 w-4" />
                  </DeleteButton>

                </div>
              </CardFooter>

            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
