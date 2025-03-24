"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Plus,
  Minus,
  Trash,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { submitFormData } from "@/lib/server-actions";
import { getAccessToken } from "@/lib/auth-actions";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function CreateRoomPage() {
  // TODO: Fix this
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    room_label: "",
    floor: "",
    room_type: "",
    capacity: 2,
    description: "",
    is_available: true,
    amenities: [
      { title: "WiFi", description: "Free WiFi", is_available: true },
      { title: "TV", description: "Flat-screen TV", is_available: true },
    ],
  });

  // Mock data - you would fetch this from your API
  const [floorOptions, setFloorOptions] = useState([
    { id: 1, level: 1, is_elevator_accessible: true },
    { id: 2, level: 2, is_elevator_accessible: true },
    { id: 3, level: 3, is_elevator_accessible: false },
  ]);

  const [roomTypeOptions, setRoomTypeOptions] = useState([
    { id: 1, room_type: "Standard Room", price: "99.00" },
    { id: 2, room_type: "Deluxe Room", price: "149.00" },
    { id: 3, room_type: "Suite", price: "249.00" },
  ]);

  // Fetch room types and floors from API
  useEffect(() => {
    async function fetchOptions() {
      try {
        const roomTypes = await fetch("/api/room-types").then((res) =>
          res.json()
        );
        const floors = await fetch("/api/floors").then((res) => res.json());

        if (roomTypes) setRoomTypeOptions(roomTypes);
        if (floors) setFloorOptions(floors);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    }

    // Comment out the next line if you don't have these endpoints yet
    // fetchOptions();
  }, []);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if any
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if any
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle image uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setRoomImages((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeImage = (index: number) => {
    setRoomImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle amenity changes
  const handleAmenityChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const newAmenities = [...prev.amenities];
      newAmenities[index] = {
        ...newAmenities[index],
        [field]: value,
      };
      return { ...prev, amenities: newAmenities };
    });
  };

  // Add a new amenity field
  const addAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [
        ...prev.amenities,
        { title: "", description: "", is_available: true },
      ],
    }));
  };

  // Remove an amenity field
  const removeAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.room_label.trim()) {
      newErrors.room_label = "Room label is required";
    }

    if (!formData.floor) {
      newErrors.floor = "Floor is required";
    }

    if (!formData.room_type) {
      newErrors.room_type = "Room type is required";
    }

    if (formData.capacity < 1) {
      newErrors.capacity = "Capacity must be at least 1";
    }

    formData.amenities.forEach((amenity, index) => {
      if (!amenity.title.trim()) {
        newErrors[`amenity_${index}`] = "Amenity title is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        toast.error("Authentication required");
        setIsLoading(false);
        return;
      }

      // Create FormData for the API call
      const submitData = new FormData();
      submitData.append("room_label", formData.room_label);
      submitData.append("floor", formData.floor);
      submitData.append("room_type", formData.room_type);
      submitData.append("capacity", formData.capacity.toString());
      submitData.append("description", formData.description || "");
      submitData.append("is_available", formData.is_available.toString());

      // Add amenities as JSON
      submitData.append("amenities_json", JSON.stringify(formData.amenities));

      // Add images
      roomImages.forEach((image) => {
        submitData.append("images", image);
      });

      const response = await submitFormData({
        endpoint: "main/rooms/",
        formData: submitData,
        accessToken,
        revalidatePaths: ["/dashboard/rooms"],
        entityName: "room",
      });

      if (response.success) {
        toast.success("Room created successfully");
        router.push("/dashboard/rooms");
      } else {
        toast.error(response.error || "Failed to create room");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("An error occurred while creating the room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/rooms">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create New Room
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Details</CardTitle>
          <CardDescription>
            Enter the details for the new room. Fields marked with an asterisk
            (*) are required.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="room_label">Room Label/Number *</Label>
                <Input
                  id="room_label"
                  name="room_label"
                  value={formData.room_label}
                  onChange={handleChange}
                  placeholder="e.g. 101, A1, etc."
                  className={errors.room_label ? "border-red-500" : ""}
                />
                {errors.room_label && (
                  <p className="text-sm text-red-500">{errors.room_label}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  className={errors.capacity ? "border-red-500" : ""}
                />
                {errors.capacity && (
                  <p className="text-sm text-red-500">{errors.capacity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="floor">Floor *</Label>
                <Select
                  value={formData.floor}
                  onValueChange={(value) => handleSelectChange("floor", value)}
                >
                  <SelectTrigger
                    id="floor"
                    className={errors.floor ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {floorOptions.map((floor) => (
                      <SelectItem key={floor.id} value={floor.id.toString()}>
                        Floor {floor.level}{" "}
                        {floor.is_elevator_accessible
                          ? "(Elevator Access)"
                          : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.floor && (
                  <p className="text-sm text-red-500">{errors.floor}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="room_type">Room Type *</Label>
                <Select
                  value={formData.room_type}
                  onValueChange={(value) =>
                    handleSelectChange("room_type", value)
                  }
                >
                  <SelectTrigger
                    id="room_type"
                    className={errors.room_type ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypeOptions.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.room_type} - ${type.price}/night
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.room_type && (
                  <p className="text-sm text-red-500">{errors.room_type}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter room description here..."
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_available"
                checked={formData.is_available}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("is_available", checked as boolean)
                }
              />
              <Label htmlFor="is_available">
                Room is available for booking
              </Label>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-medium">Room Images</Label>
                <div className="relative">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Label htmlFor="images" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images
                    </Button>
                  </Label>
                </div>
              </div>

              {roomImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {roomImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-md border bg-muted overflow-hidden">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`Room image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed rounded-md py-8 flex flex-col items-center justify-center text-muted-foreground mb-4">
                  <ImageIcon className="h-8 w-8 mb-2" />
                  <p>No images uploaded yet</p>
                  <p className="text-sm">
                    Upload room images to improve booking rates
                  </p>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-medium">Amenities</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAmenity}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Amenity
                </Button>
              </div>

              <div className="space-y-4">
                {formData.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 items-start p-4 border rounded-md"
                  >
                    <div className="col-span-12 md:col-span-5 space-y-2">
                      <Label htmlFor={`amenity-title-${index}`}>Title *</Label>
                      <Input
                        id={`amenity-title-${index}`}
                        value={amenity.title}
                        onChange={(e) =>
                          handleAmenityChange(index, "title", e.target.value)
                        }
                        placeholder="e.g. WiFi, TV, etc."
                        className={
                          errors[`amenity_${index}`] ? "border-red-500" : ""
                        }
                      />
                      {errors[`amenity_${index}`] && (
                        <p className="text-sm text-red-500">
                          {errors[`amenity_${index}`]}
                        </p>
                      )}
                    </div>

                    <div className="col-span-12 md:col-span-5 space-y-2">
                      <Label htmlFor={`amenity-desc-${index}`}>
                        Description
                      </Label>
                      <Input
                        id={`amenity-desc-${index}`}
                        value={amenity.description}
                        onChange={(e) =>
                          handleAmenityChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Brief description"
                      />
                    </div>

                    <div className="col-span-8 md:col-span-1 flex items-center mt-8">
                      <Checkbox
                        id={`amenity-available-${index}`}
                        checked={amenity.is_available}
                        onCheckedChange={(checked) =>
                          handleAmenityChange(
                            index,
                            "is_available",
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`amenity-available-${index}`}
                        className="ml-2"
                      >
                        Available
                      </Label>
                    </div>

                    <div className="col-span-4 md:col-span-1 flex justify-end mt-8">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAmenity(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" type="button" asChild>
              <Link href="/dashboard/rooms">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Room"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
