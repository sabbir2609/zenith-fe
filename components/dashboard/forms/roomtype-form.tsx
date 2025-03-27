import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form";
import { SubmitButton } from "../common/submit-button";

interface RoomTypeFormProps {
    createRoomType?: (formData: FormData) => Promise<void>;
    updateRoomType?: (formData: FormData) => Promise<void>;
    initialData?: {
        room_type?: string;
        price?: number;
        description?: string;
    };
    submitLabel?: string;
}

export default function RoomTypeForm(
    {
        createRoomType,
        updateRoomType,
        initialData = {},
        submitLabel = "Save",
    }: RoomTypeFormProps
) {
    const handleAction = createRoomType || updateRoomType || (() => { });
    return (
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
            </DialogFooter>
        </Form>
    );
}