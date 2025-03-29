"use client";

import { useState } from "react";
import { createFloor } from "@/lib/server-actions";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Form from "next/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/dashboard";
import { toast } from "sonner";

export default function CreateFloor() {
  const [open, setOpen] = useState(false);

  async function handleFormAction(formData: FormData) {
    const result = await createFloor(formData);

    if (result.success) {
      toast(`${result.message}`)
      setOpen(false); // Close dialog on success
    } else {
      toast(`${result.message}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a New Floor</DialogTitle>
        <DialogDescription>
          Fill in the details for the new floor you want to add.
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
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="is_elevator_accessible">Elevator Accessible</Label>
              <Select
                name="is_elevator_accessible"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
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
          </CardFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}