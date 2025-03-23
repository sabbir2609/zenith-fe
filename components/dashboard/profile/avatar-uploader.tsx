"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { User } from "@/lib/types";
import useSWR from "swr";

interface AvatarUploaderProps {
  user: User;
  accessToken: string;
}

// Create a fetcher that uses the access token from props
const createFetcher = (accessToken: string) => async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

export default function AvatarUploader({
  user: initialUser,
  accessToken,
}: AvatarUploaderProps) {
  // Use SWR with the token from props
  const { data: user, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`,
    createFetcher(accessToken),
    { fallbackData: initialUser }
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size (500KB max)
    if (file.size > 500 * 1024) {
      return "Image must be smaller than 500KB";
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      return "Selected file must be an image";
    }

    return null;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate the file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image to upload");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Create form data
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      // Send to API
      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      // Update the cached data
      await mutate();

      // Close modal
      setIsOpen(false);
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
            src={user?.avatar || "/avatar.jpg"}
            alt={`${user?.first_name || "User"}'s profile picture`}
            width={128}
            height={128}
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
              Upload a new profile picture (300x300px recommended, max 500KB)
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5 items-center">
            <div
              className="border-2 border-dashed rounded-lg p-8 cursor-pointer
                border-gray-300 hover:border-primary/50
                flex flex-col items-center justify-center gap-4 w-full max-w-md"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-gray-400" />
              <div className="text-center">
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs text-muted-foreground mt-1">
                  300x300px recommended, max 500KB
                </p>
                {selectedFile && (
                  <p className="text-xs font-medium text-primary mt-2">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {error && (
              <div className="px-3 py-2 rounded-md text-sm font-medium bg-destructive/10 text-destructive w-full">
                {error}
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload Profile Picture"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
