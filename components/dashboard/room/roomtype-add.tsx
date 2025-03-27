"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import RoomTypeForm from "../forms/roomtype-form";

interface AddRoomTypeProps {
  createRoomType: (formData: FormData) => Promise<void>;
}

export default function AddRoomType({ createRoomType }: AddRoomTypeProps
) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="h-5 w-5 mr-2" />
          Add Room Type
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Room Type</DialogTitle>
        <RoomTypeForm createRoomType={createRoomType} />
      </DialogContent>
    </Dialog>
  );
}
