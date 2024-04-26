import { cookies } from 'next/headers'
import Image from 'next/image';
import { Carousel } from '@/components/dashboard/ui';
import { Fetch } from '@/app/lib';

interface RoomType {
    id: number;
    room_type: string;
    price: string;
    description: string;
}

interface Image {
    id: number;
    image: string;
    description: string | null;
}

interface Amenity {
    id: number;
    room: number;
    title: string;
    description: string;
    is_available: boolean;
}

interface Room {
    id: number;
    floor: number;
    room_label: string;
    room_type: RoomType;
    capacity: number;
    description: string;
    is_available: boolean;
    images: Image[];
    amenities: Amenity[];
}


export function generateMetadata() {
    return {
        title: 'Room Details',
        description: 'Room details page',
    }
}

export default async function roomDetailPage(
    { params }: { params: { id: number } }
) {
    const room: Room = await Fetch({ endpoint: `main/rooms/${params.id}/` });
    return (
        <div className='container mx-auto mb-2'>

            <h1 className="text-3xl font-mono mb-3">
                Room Details for {room.floor} | {room.room_label}
            </h1>

            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-6">

                <Carousel images={room.images} />

                <div className="container">

                    <div className="mb-2">
                        <p className="text-primary font-medium mb-1">
                            {room.room_type.room_type}
                        </p>
                        <p className="text-lg font-semibold">
                            Floor: {room.floor}
                        </p>
                        <p className="text-xl font-bold mb-2">
                            Label: {room.room_label}
                        </p>
                        <div className="mt-2">
                            <p className="text-lg font-semibold">Capacity: {room.capacity}</p>
                        </div>
                    </div>

                    <details className="collapse border collapse-plus mb-2 border-gray-200 rounded-md shadow-sm">
                        <summary className="collapse-title text-lg font-semibold cursor-pointer">Description</summary>
                        <p className="collapse-content text-sm">{room.description}</p>
                    </details>

                    <div className="divider"></div>

                    <button className="btn btn-primary">
                        Check Availability
                    </button>

                </div>

            </div>

        </div>

    )
}
