import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Floor } from "@/lib/types";
import { Eye } from "lucide-react";

export default function FloorDetails({ floor }: { floor: Floor }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Floor Details</DialogTitle>
        <DialogDescription>
          Floor details for level {floor.level}
        </DialogDescription>
        <div className="space-y-4">
          <div className="space-y-2">
            <strong>Level:</strong> {floor.level}
          </div>
          <div className="space-y-2">
            <strong>Elevator Accessible:</strong>{" "}
            {floor.is_elevator_accessible ? "Yes" : "No"}
          </div>
          <div className="space-y-2">
            <strong>Description:</strong> {floor.description || "No description available"}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}