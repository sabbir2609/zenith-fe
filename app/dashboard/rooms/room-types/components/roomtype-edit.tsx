"use client";

import { SubmitButton } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import Form from "next/form";
import { toast } from "sonner";
import { useState } from "react";
import { updateRoomType } from "@/lib/server-actions";

import { RoomType } from "@/lib/types";

interface RoomTypeEditProps {
  initialData: RoomType;
  submitLabel: string;
  id: number;
}

export default function EditRoomType({
  initialData,
  submitLabel,
  id,
}: RoomTypeEditProps
) {
  const [open, setOpen] = useState(false);

  async function handleAction(formData: FormData) {
    const response = await updateRoomType(formData, id);
    if (response.success) {
      setOpen(false);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Plus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Room Type</DialogTitle>
        <DialogDescription>
          Create a new room type with its details and pricing.
        </DialogDescription>
        <Form action={handleAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="room-type">Room Type</Label>
              <Input
                type="text"
                name="room_type"
                id="room-type"
                placeholder="e.g. Standard Room"
                defaultValue={initialData.room_type}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="e.g. 100"
                defaultValue={initialData.price}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Add a description for this room type"
              defaultValue={initialData.description}
              required
            />
          </div>
          <DialogFooter>
            <SubmitButton label={submitLabel} />
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              className="text-red-500"
            >
              Cancel
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
