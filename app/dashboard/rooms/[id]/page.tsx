import Image from "next/image";
import Link from "next/link";
import {
  Check,
  X,
  ArrowLeft,
  Users,
  Home,
  Building,
  Tag,
  Calendar,
  Edit,
  Wifi,
  Tv,
  Coffee,
  ShowerHead,
} from "lucide-react";
import { fetchData } from "@/lib/server-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Room } from "@/lib/types";
import ToastHandler from "@/components/common/toast";

export default async function RoomDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const room: Room = await fetchData(`main/rooms/${id}`);

  // Map of amenity titles to icons
  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="h-4 w-4" />,
    TV: <Tv className="h-4 w-4" />,
    "Coffee Maker": <Coffee className="h-4 w-4" />,
    Shower: <ShowerHead className="h-4 w-4" />,
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <ToastHandler />
      {/* Header with back button and availability badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/rooms">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            Room {room.room_label} Details
          </h1>
        </div>
        <Badge variant={room.is_available ? "default" : "destructive"}>
          {room.is_available ? "Available" : "Not Available"}
        </Badge>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Images */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {room.images.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {room.images.map((image) => (
                      <CarouselItem key={image.id}>
                        <div className="relative aspect-video">
                          <Image
                            src={image.image}
                            alt={image.description || `Room ${room.room_label}`}
                            fill
                            className="object-cover rounded-md"
                            priority
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              ) : (
                <div className="relative aspect-video">
                  <Image
                    src={`/no-img.png`}
                    alt={"No image available"}
                    fill
                    className="object-cover rounded-md"
                    priority
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column - Quick info */}
        <Card className="h-fit">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{room.room_type.room_type}</h2>
              <p className="text-muted-foreground">
                Room {room.room_label} on Floor {room.floor.level}
              </p>
            </div>

            <div className="flex items-center justify-between py-2 border-y">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>
                  {room.capacity} {room.capacity > 1 ? "Guests" : "Guest"}
                </span>
              </div>
              <div className="text-xl font-bold">
                ${room.room_type.price}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  / night
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Room {room.room_label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Floor {room.floor.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{room.room_type.room_type}</span>
                </div>
                <Button
                  variant="outline"
                >
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Check Availability</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Button className="w-full" disabled={!room.is_available}>
                {room.is_available ? "Book Now" : "Not Available"}
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href={`/dashboard/rooms/${room.id}/edit`}
                  className="w-full"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Room
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs section */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        {/* Details tab */}
        <TabsContent value="details" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Room Description</h3>
              <p>{room.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Room Type Details</h3>
              <p>{room.room_type.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Floor Information</h3>
              <div className="flex items-center gap-2">
                <span>Level {room.floor.level}</span>
                {room.floor.is_elevator_accessible ? (
                  <Badge variant="outline">Elevator Accessible</Badge>
                ) : (
                  <Badge variant="destructive">Elevator Not Accessible</Badge>
                )}
              </div>
              <p className="mt-2">
                {room.floor.description ||
                  "No additional floor information available."}
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Amenities tab */}
        <TabsContent value="amenities" className="p-4 border rounded-md mt-2">
          {room.amenities.length === 0 && (
            <p className="text-muted-foreground">
              No amenities are listed for this room yet.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {room.amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex items-start p-3 rounded-lg border"
              >
                <div className="mr-3 mt-0.5">
                  {amenityIcons[amenity.title] ||
                    (amenity.is_available ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    ))}
                </div>
                <div>
                  <h4 className="font-medium">{amenity.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {amenity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Policies tab */}
        <TabsContent value="policies" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Cancellation Policy
              </h3>
              <p>
                Free cancellation up to 24 hours before check-in. Cancellations
                made less than 24 hours in advance are subject to a one-night
                charge.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Check-in & Check-out
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Check-in Time</h4>
                  <p>From 3:00 PM</p>
                </div>
                <div>
                  <h4 className="font-medium">Check-out Time</h4>
                  <p>Until 11:00 AM</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">House Rules</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>No smoking in rooms</li>
                <li>No pets allowed</li>
                <li>Quiet hours from 10:00 PM to 7:00 AM</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
