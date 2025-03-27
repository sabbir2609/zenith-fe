import { fetchData } from "@/lib/server-actions";
import Link from "next/link";
import Image from "next/image";
import { Room } from "@/lib/types";
import {
  FileSymlink,
  Plus,
  Search,
  Filter,
  ChevronDown,
  BedDouble,
  Calendar,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pagination } from "@/components/dashboard";

export function generateMetadata() {
  return {
    title: "Rooms",
    description: "List of all rooms",
  };
}

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: { page?: string; view?: string };
}) {
  const resolvedSearchParam = await searchParams;
  const page = resolvedSearchParam.page
    ? parseInt(resolvedSearchParam.page)
    : 1;
  const view = resolvedSearchParam.view as string;
  const data = await fetchData(`main/rooms?page=${page}`);
  const rooms: Room[] = data.results;

  const baseURL = "/dashboard/rooms";
  const totalRooms = data.count;
  const availableRooms = data.available_rooms_count;
  const totalPages = Math.ceil(totalRooms / 10);

  return (
    <div className="flex flex-col gap-6">
      {/* Header with stats cards */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            Room Management
          </h1>
          <Button asChild>
            <Link href="/dashboard/rooms/create">
              <Plus className="mr-2 h-4 w-4" />
              Add New Room
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRooms}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Rooms
              </CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableRooms}</div>
              <p className="text-xs text-muted-foreground">
                {totalRooms > 0
                  ? ((availableRooms / totalRooms) * 100).toFixed(1)
                  : 0}
                % available
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search rooms..."
            className="pl-8 w-full sm:max-w-sm"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Rooms</DropdownMenuItem>
              <DropdownMenuItem>Available Rooms</DropdownMenuItem>
              <DropdownMenuItem>Unavailable Rooms</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                View
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`${baseURL}?view=table`}>Table View</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`${baseURL}?view=grid`}>Grid View</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Empty state */}
      {rooms.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 flex flex-col items-center justify-center text-center">
            <BedDouble className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No rooms available</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Add rooms to start managing your property inventory and make them
              available for booking.
            </p>
            <Button asChild>
              <Link href="/dashboard/rooms/create">
                <Plus className="mr-2 h-4 w-4" />
                Add New Room
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : view === "grid" ? (
        // Grid view
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                {room.images && room.images.length > 0 ? (
                  <Image
                    src={room.images[0].image}
                    alt={`Room ${room.room_label}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <BedDouble className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <Badge
                  className="absolute top-2 right-2"
                  variant={room.is_available ? "default" : "destructive"}
                >
                  {room.is_available ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>Room {room.room_label}</CardTitle>
                  <Badge variant="outline">{room.room_type.room_type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Floor {room.floor.level}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <BedDouble className="h-4 w-4" />
                    <span>{room.capacity} Guests</span>
                  </div>
                </div>
                <div className="mt-2 font-semibold">
                  ${room.room_type.price}/night
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!room.is_available}
                >
                  {room.is_available ? "Book Now" : "Unavailable"}
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/rooms/${room.id}`}>
                    <FileSymlink className="h-4 w-4" />
                    <span className="ml-1">Details</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        // Table view
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">
                    Room {room.room_label}
                  </TableCell>
                  <TableCell>Floor {room.floor.level}</TableCell>
                  <TableCell>{room.room_type.room_type}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${room.room_type.price}
                  </TableCell>
                  <TableCell>{room.capacity} Guests</TableCell>
                  <TableCell>
                    <Badge
                      variant={room.is_available ? "default" : "destructive"}
                    >
                      {room.is_available ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!room.is_available}
                      >
                        Book
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/rooms/${room.id}`}>
                          <FileSymlink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {rooms.length > 0 && (
        <div className="flex justify-center py-4">
          <Pagination baseURL={baseURL} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
