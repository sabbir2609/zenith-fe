"use client";

import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { LucideUpload, RefreshCw, Check } from "lucide-react";
import { getCroppedImg } from "./utils";

export interface SimpleImageUploadProps {
  onImageUpload: (croppedImage: string) => void;
  aspectRatio?: number;
  cropShape?: "rect" | "round";
  isLoading?: boolean;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function SimpleImageUpload({
  onImageUpload,
  aspectRatio = 1,
  cropShape = "rect",
  isLoading = false,
}: SimpleImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simple file validation
      if (file.size > 5 * 1024 * 1024) {
        setError("File too large. Maximum size is 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }

    if (event.target) event.target.value = "";
  };

  const onCropComplete = useCallback(
    async (_: CropArea, croppedAreaPixels: CropArea) => {
      if (!image) return;

      try {
        setIsProcessing(true);
        const croppedImg = await getCroppedImg(
          image,
          croppedAreaPixels,
          0 // No rotation in simplified version
        );
        setCroppedImage(croppedImg);
        onImageUpload(croppedImg);
      } catch (e) {
        console.error(e);
        setError("Error processing image");
      } finally {
        setIsProcessing(false);
      }
    },
    [image, onImageUpload]
  );

  const resetImage = () => {
    setImage(null);
    setCroppedImage(null);
    setZoom(1);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {!image ? (
        <div
          className="border-2 border-dashed rounded-lg p-8 cursor-pointer
            border-gray-300 hover:border-primary/50
            flex flex-col items-center justify-center gap-4 w-full max-w-md h-64"
          onClick={() => fileInputRef.current?.click()}
        >
          <LucideUpload className="w-12 h-12 text-gray-400" />
          <div className="text-center">
            <p className="text-sm font-medium">Click to upload image</p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports JPG, PNG and WebP up to 5MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="w-full max-w-md flex flex-col gap-6">
          <div
            className={`relative overflow-hidden bg-checkerboard
              ${cropShape === "round" ? "rounded-full" : "rounded-lg"}`}
            style={{
              width: "320px",
              height: "320px",
              margin: "0 auto",
            }}
          >
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              cropShape={cropShape}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              showGrid={true}
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium">Zoom</span>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.01}
              onValueChange={(vals) => setZoom(vals[0])}
            />
          </div>

          {croppedImage && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium">Preview</span>
              <div
                className={`relative overflow-hidden border ${
                  cropShape === "round" ? "rounded-full" : "rounded-lg"
                }`}
                style={{ width: "120px", height: "120px" }}
              >
                <Image
                  src={croppedImage}
                  alt="Cropped Preview"
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="px-3 py-2 rounded-md text-sm font-medium bg-destructive/10 text-destructive">
              {error}
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={resetImage}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={() =>
                onCropComplete(
                  { x: 0, y: 0, width: 0, height: 0 },
                  { x: 0, y: 0, width: 100, height: 100 }
                )
              }
              disabled={isProcessing || isLoading}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Confirm
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
