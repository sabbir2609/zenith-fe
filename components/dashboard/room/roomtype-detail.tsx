'use client';

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RoomType } from "@/lib/types";
import { FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface RoomTypeDetailDialogProps {
    roomType: RoomType;
}

export default function RoomTypeDetailDialog({ roomType }: RoomTypeDetailDialogProps) {
    const isMobile = useIsMobile();

    // Shared content component
    const Content = (
        <div className="flex flex-col gap-5 py-3">
            <h3 className="text-xl font-bold tracking-tight text-primary">{roomType.room_type}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{roomType.description || "No description available"}</p>
            <div className="flex items-center gap-1 text-lg font-medium">
                <span>Price:</span>
                <span className="text-primary">${roomType.price}</span>
                <span className="text-xs text-muted-foreground ml-1">per night</span>
            </div>
        </div>
    );

    // Use Drawer for mobile and Dialog for desktop
    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Details
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="px-4 py-4">
                        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Room Type Details</h2>
                        {Content}
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Details
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogTitle className="text-xl font-semibold border-b pb-2">Room Type Details</DialogTitle>
                {Content}
            </DialogContent>
        </Dialog>
    );
}