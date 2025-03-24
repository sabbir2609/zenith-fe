import Link from "next/link";
import { Edit, Trash, BedDouble, DollarSign, FileText } from "lucide-react";
import { fetchData } from "@/lib/server-actions";
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
import AddRoomType from "@/components/dashboard/room/add-roomtype";
import { getAccessToken } from "@/lib/auth-actions";
import ToastHandler from "@/components/common/toast";

export default async function Page() {
  const accessToken = await getAccessToken();
  const roomTypes: RoomType[] = await fetchData("main/room-types/");

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
        <AddRoomType accessToken={accessToken} />
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
            <AddRoomType accessToken={accessToken} />
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
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/rooms/room-types/${roomType.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    Details
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-blue-500">
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
