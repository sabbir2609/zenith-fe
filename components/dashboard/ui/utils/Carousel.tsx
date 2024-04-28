import Image from 'next/image';
import { RoomImage } from '@/public/static';

interface Image {
    id: number;
    image: string;
    description: string | null;
}

interface CarouselProps {
    images: Image[];
}

export default function Carousel({ images }: CarouselProps) {
    if (images.length === 0) {
        return (
            <div className="carousel w-full h-96 rounded">
                <div className="carousel-item relative w-full">
                    <Image src={RoomImage} className="w-full" alt="Room Image" layout="fill" objectFit="cover" />
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="carousel w-full h-96 rounded">
                {images.map((image, index) => (
                    <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full">
                        <Image src={image.image} className="w-full" alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={`#slide${index === 0 ? images.length : index}`} className="btn btn-circle btn-outline">❮</a>
                            <a href={`#slide${index + 2 > images.length ? 1 : index + 2}`} className="btn btn-circle btn-outline">❯</a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};