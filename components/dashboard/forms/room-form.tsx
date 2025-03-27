import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Floor, ImageTypes, RoomAmenities, RoomType } from "@/lib/types";
import Form from "next/form";
import { SubmitButton } from "../common/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RoomFormProps {
  createRoom?: (formData: FormData) => void;
  updateRoom?: (formData: FormData) => void;
  floors: Floor[];
  roomTypes: RoomType[];
  initialData?: {
    floor?: Floor;
    room_label?: string;
    room_type?: RoomType;
    capacity?: number;
    description?: string;
    is_available?: boolean;
    images?: ImageTypes[];
    amenities?: RoomAmenities[];
  };
  submitLabel?: string;
  availableAmenities?: RoomAmenities[];
}

export default async function RoomForm({
  createRoom,
  updateRoom,
  floors,
  roomTypes,
  initialData = {},
  submitLabel = "Save",
}: RoomFormProps) {
  const handleAction = createRoom || updateRoom || (() => { });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Room Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form action={handleAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="floor">Floor Level</Label>
              <Select
                name="floor"
                defaultValue={initialData.floor?.level?.toString()}
                required
              >
                <SelectTrigger id="floor" className="w-full">
                  <SelectValue placeholder="Select Floor" />
                </SelectTrigger>
                <SelectContent>
                  {floors.map((floor) => (
                    <SelectItem key={floor.level} value={String(floor.level)}>
                      {floor.level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="room_type">Room Type</Label>
              <Select
                name="room_type"
                defaultValue={initialData.room_type?.id?.toString()}
                required
              >
                <SelectTrigger id="room_type" className="w-full">
                  <SelectValue placeholder="Select Room Type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((roomType) => (
                    <SelectItem key={roomType.id} value={String(roomType.id)}>
                      {roomType.room_type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="room_label">Room Label</Label>
              <Input
                id="room_label"
                name="room_label"
                type="text"
                placeholder="e.g., Room 101"
                defaultValue={initialData.room_label}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                placeholder="Number of people"
                defaultValue={initialData.capacity}
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the room features and highlights"
              defaultValue={initialData.description}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_available"
              name="is_available"
              value="true"
              defaultChecked={initialData.is_available === true}
            />
            <Label htmlFor="is_available">Available for booking</Label>
          </div>

          <div className="pt-4">
            <SubmitButton label={submitLabel} className="w-full sm:w-auto" />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
