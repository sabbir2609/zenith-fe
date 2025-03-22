"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  itemName?: string;
}

export function DeleteButton({
  onDelete,
  itemName = "item",
}: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete();
      toast.success(`${itemName} deleted successfully`);
      // No need to close dialog here as we're redirecting
    } catch (error: unknown) {
      // Check if it's a Next.js redirect error (not a real error)
      if ((error as { message?: string })?.message?.includes("NEXT_REDIRECT")) {
        // This is a redirect, not an error
        toast.success(`${itemName} deleted successfully`);
      } else {
        // This is a genuine error
        console.error("Error deleting:", error);
        toast.error(`Failed to delete ${itemName}`);
      }
    } finally {
      setIsLoading(false);
      // Only close dialog if we're not redirecting
      if (!isLoading) {
        setOpen(false);
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the {itemName}. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
