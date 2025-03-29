import { BedDouble, DollarSign } from "lucide-react";
import { fetchData } from "@/lib/server-actions";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RoomType } from "@/lib/types";
import { DeleteItem } from "@/components/dashboard";
import AddRoomType from "./components/roomtype-create";
import RoomTypeDetail from "./components/roomtype-detail";
import EditRoomType from "./components/roomtype-edit";

export default async function Page() {
  const roomTypes: RoomType[] = await fetchData("main/room-types/");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Room Types</h1>
          <p className="text-muted-foreground mt-1">
            Manage available room types and their pricing
          </p>
        </div>
        <AddRoomType />
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
            <AddRoomType />
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
                  <EditRoomType id={roomType.id} initialData={roomType} submitLabel="Update" />
                  <DeleteItem endpoint={`main/room-types/${roomType.id}`} itemName="room type" key={roomType.id} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
