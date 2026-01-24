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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabularImage from "./tabular-image";

interface RoomFormProps {
  createRoom?: (formData: FormData) => void;
  updateRoom?: (formData: FormData) => void;
  floors: Floor[];
  roomTypes: RoomType[];
  initialData?: {
    id?: number;
    floor?: {
      level?: number;
      is_elevator_accessible?: boolean;
      description?: string;
    };
    room_label?: string;
    room_type?: {
      id?: number;
      room_type?: string;
      price?: string;
      description?: string;
    };
    capacity?: number;
    description?: string;
    is_available?: boolean;
    images?: ImageTypes[];
    amenities?: RoomAmenities[];
  };
  submitLabel?: string;
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
    <Tabs defaultValue="general" className="w-full">

      <TabsList className="grid grid-cols-3 w-100 mb-2">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
        <TabsTrigger value="images">Images</TabsTrigger>
      </TabsList>
      <Form action={handleAction} className="space-y-4">

        <TabsContent value="general" className="space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">

                <div>
                  <Label htmlFor="floor">Floor</Label>
                  <Select name="floor" defaultValue={initialData.floor?.level?.toString()} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a floor" />
                    </SelectTrigger>
                    <SelectContent>
                      {floors.map((floor) => (
                        <SelectItem key={floor.level} value={floor.level.toString()}>
                          {floor.level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="room_label">Room Label</Label>
                  <Input
                    id="room_label"
                    name="room_label"
                    defaultValue={initialData.room_label}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="room_type">Room Type</Label>
                  <Select name="room_type" defaultValue={initialData.room_type?.id?.toString()} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.room_type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 mt-4">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  defaultValue={initialData.capacity}
                  required
                />

                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={initialData.description}
                />

                <Label htmlFor="is_available">Is Available?</Label>
                <Switch id="is_available" name="is_available" defaultChecked={initialData.is_available} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="amenities">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Implement amenities form here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="images">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Implement images form here */}
              <TabularImage />
            </CardContent>
          </Card>
        </TabsContent>
      </Form>
      <div className="flex justify-end mt-4">
        <SubmitButton label={submitLabel} />
      </div>
    </Tabs>
  );
}