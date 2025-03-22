"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ImageUploadPreview from "@/components/dashboard/common/upload-image";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types";
import { cookies } from "next/headers";

interface AvatarUploaderProps {
  user: User;
}

export default function AvatarUploader({ user }: AvatarUploaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleImageUpload = async (croppedImageDataUrl: string) => {
    try {
      setIsUploading(true);
      setError(null);

      // Convert data URL to blob
      const response = await fetch(croppedImageDataUrl);
      const blob = await response.blob();

      // Create form data
      const formData = new FormData();
      formData.append("avatar", blob, "profile-image.jpg");

      // Send to API
      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/avatar`,
        {
          method: "PATCH",
          headers: {
            Authorization: //TODO: get token from cookies, make a fetch for client side with credentials: "include"
          },
          body: formData,
        }
      );
      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }
      // Close modal and refresh page data
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setError(
        error instanceof Error ? error.message : "Failed to upload image"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="relative group">
        <div className="relative h-32 w-32">
          <Image
            src={user.avatar || "/avatar.jpg"}
            alt={`${user.first_name}'s profile picture`}
            fill
            className="rounded-full object-cover border-4 border-background"
            priority
          />
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Button size="sm" variant="ghost" className="text-white">
            <Edit className="h-4 w-4 mr-1" /> Change
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>
              Upload and crop your new profile picture
            </DialogDescription>
          </DialogHeader>

          <ImageUploadPreview
            onImageUpload={handleImageUpload}
            aspectRatio={1}
            cropShape="round"
            isLoading={isUploading}
          />

          {error && (
            <div className="px-3 py-2 rounded-md text-sm font-medium bg-destructive/10 text-destructive">
              {error}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
