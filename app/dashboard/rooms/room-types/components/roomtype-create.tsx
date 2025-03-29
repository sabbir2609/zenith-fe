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
import { createRoomType } from "@/lib/server-actions";
import { Plus } from "lucide-react";
import Form from "next/form";
import { useState } from "react";
import { toast } from "sonner";

export default function AddRoomType() {
  const [open, setOpen] = useState(false);
  async function handleFormAction(formData: FormData) {
    const response = await createRoomType(formData);
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
        <Button variant="default">
          <Plus className="h-5 w-5 mr-2" />
          Add Room Type
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Room Type</DialogTitle>
        <DialogDescription>
          Create a new room type with its details and pricing.
        </DialogDescription>
        <Form action={handleFormAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="room-type">Room Type</Label>
              <Input
                type="text"
                name="room_type"
                id="room-type"
                placeholder="e.g. Standard Room"
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
              required
            />
          </div>
          <DialogFooter>
            <SubmitButton label='Save' />
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
