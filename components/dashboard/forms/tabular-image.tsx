"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ImageItem {
    id: string;
    image: string;
    description: string;
    file?: File;
}

interface TabularImageProps {
    initialImages?: ImageItem[];
    onChange?: (images: ImageItem[]) => void;
}

export default function TabularImage({ initialImages, onChange }: TabularImageProps) {

    const [imageList, setImageList] = useState<ImageItem[]>(initialImages || []);

    const addNewImage = () => {
        const newImage: ImageItem = {
            id: Date.now().toString(),
            image: "",
            description: "",
        };
        setImageList((prev) => {
            const updated = [...prev, newImage];
            onChange?.(updated);
            return updated;
        });
    };

    const removeImage = (id: string) => {
        setImageList((prev) => {
            const updated = prev.filter((item) => item.id !== id);
            onChange?.(updated);
            return updated;
        });
    };

    const handleDescriptionChange = (id: string, value: string) => {
        setImageList((prev) => {
            const updated = prev.map((item) =>
                item.id === id ? { ...item, description: value } : item
            );
            onChange?.(updated);
            return updated;
        });
    };

    const handleImageChange = (id: string, file: File) => {
        setImageList((prev) => {
            const updated = prev.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        file,
                        image: URL.createObjectURL(file)
                    };
                }
                return item;
            });
            onChange?.(updated);
            return updated;
        });
    };

    return (
        <div className="space-y-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Preview</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {imageList.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Input
                                    id={`image-${item.id}`}
                                    type="file"
                                    accept="image/*"
                                    placeholder="Upload image"
                                    name="image"
                                    onChange={(e) => e.target.files?.[0] && handleImageChange(item.id, e.target.files[0])}
                                />
                            </TableCell>

                            <TableCell>
                                <Image
                                    key={item.id}
                                    src={item.image || "/no-image.png"}
                                    alt="Preview"
                                    width={40}
                                    height={40}
                                    className="object-cover rounded-md w-10 h-10"
                                />
                            </TableCell>

                            <TableCell>
                                <Input
                                    id={`description-${item.id}`}
                                    type="text"
                                    placeholder="Enter description"
                                    value={item.description}
                                    name="description"
                                    onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                                />
                            </TableCell>

                            <TableCell className="text-right">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeImage(item.id)}
                                    disabled={imageList.length === 1}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={addNewImage} className="w-1/4" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add another
            </Button>
        </div>
    );
}