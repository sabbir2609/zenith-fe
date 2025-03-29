"use client";
import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Floor } from "@/lib/types";
import Form from "next/form";
import { SubmitButton } from "@/components/dashboard";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { updateFloor } from "@/lib/server-actions";
import { toast } from "sonner";

export default function EditFloor(
  { floor }: { floor: Floor }
) {
  const [open, setOpen] = useState(false);

  const initialData = {
    level: floor.level,
    is_elevator_accessible: floor.is_elevator_accessible,
    description: floor.description,
  };

  async function handleFormAction(formData: FormData) {
    const result = await updateFloor(formData, floor.level);
    if (result.success) {
      setOpen(false);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} key={floor.level}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Floor</DialogTitle>
        <DialogDescription>
          Update the floor information
        </DialogDescription>

        <Form action={handleFormAction} className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                name="level"
                type="number"
                placeholder="Floor Level"
                max="99"
                min="0"
                defaultValue={initialData.level}
                readOnly={true}
                className="opacity-50 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="is_elevator_accessible">Elevator Accessible</Label>
              <Select
                name="is_elevator_accessible"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={initialData.is_elevator_accessible.toString() == "true" ? "Yes" : "No"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description of the floor"
                className="min-h-32"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <SubmitButton label="Save" />
            <Button variant="outline" onClick={() => setOpen(false)} className="ml-2">
              Cancel
            </Button>
          </CardFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
