/**
 * Creates a cropped version of an image using canvas
 *
 * @param imageSrc - The source image as a data URL
 * @param pixelCrop - The crop area in pixels { x, y, width, height }
 * @param rotation - Rotation in degrees
 * @param flip - Optional object specifying horizontal/vertical flip { horizontal, vertical }
 * @returns A Promise that resolves to the cropped image as a data URL
 */
export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation: number = 0,
  flip = { horizontal: false, vertical: false }
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Set canvas size to the desired cropped image size
  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // Set dimensions based on rotation
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Translate canvas context to center
  ctx.translate(canvas.width / 2, canvas.height / 2);

  // Apply rotation
  ctx.rotate((rotation * Math.PI) / 180);

  // Apply flip
  if (flip.horizontal) {
    ctx.scale(-1, 1);
  }
  if (flip.vertical) {
    ctx.scale(1, -1);
  }

  // Draw rotated image and then translate back
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // Draw the image at its original size first
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  // Get the data from the created image using the crop settings
  const data = ctx.getImageData(
    safeArea / 2 - image.width * 0.5 + pixelCrop.x,
    safeArea / 2 - image.height * 0.5 + pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // Reset canvas
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Place the cropped image data
  ctx.putImageData(data, 0, 0);

  // Return as a data URL of type image/jpeg with 0.9 quality
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          resolve(dataUrl);
        };
      },
      "image/jpeg",
      0.9
    );
  });
};

/**
 * Creates an image element from a source URL
 */
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
