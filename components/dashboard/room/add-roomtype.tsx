"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { createRoomType } from "@/lib/server-actions";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "../common/submit-button";

interface AddRoomTypeProps {
  accessToken: string | null;
}

export default function AddRoomType({ accessToken }: AddRoomTypeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleSubmit = async (formData: FormData) => {
    if (!accessToken) {
      toast.error("Authentication required");
      return;
    }

    setLoading(true);

    try {
      const result = await createRoomType(formData, accessToken);

      if (result.success) {
        toast.success("Room type added successfully");
        closeDialog();
      } else {
        toast.error(result.error || "Failed to add room type");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        `Failed to add room type: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={openDialog}>
        <Plus className="mr-2 h-4 w-4" />
        Add Room Type
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>Add Room Type</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new room type with a unique name, pricing, and description.
          </DialogDescription>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleSubmit(formData);
            }}
            className="space-y-4"
          >
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="room-type">Room Type</Label>
              <Input
                type="text"
                name="room_type"
                id="room-type"
                placeholder="e.g. Standard Room"
                required
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="e.g. 100"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="e.g. A standard room with a queen bed"
              />
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <SubmitButton disabled={loading} label="Add" />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
