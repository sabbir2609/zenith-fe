import { CardContent, CardFooter } from "@/components/ui/card";
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
import { SubmitButton } from "../common/submit-button";

interface FloorFormProps {
  createFloor?: (formData: FormData) => void;
  updateFloor?: (formData: FormData) => void;
  initialData?: {
    level?: number;
    is_elevator_accessible?: boolean;
    description?: string;
  };
  submitLabel?: string;
}

export default function FloorForm({
  createFloor,
  updateFloor,
  initialData = {},
  submitLabel = "Save",
}: FloorFormProps) {
  const handleAction = createFloor || updateFloor;

  return (
    <form action={handleAction}>
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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="is_elevator_accessible">Elevator Accessible</Label>
          <Select
            name="is_elevator_accessible"
            defaultValue={initialData.is_elevator_accessible ? "true" : "false"}
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
            defaultValue={initialData.description}
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <SubmitButton label={submitLabel} />
      </CardFooter>
    </form>
  );
}
