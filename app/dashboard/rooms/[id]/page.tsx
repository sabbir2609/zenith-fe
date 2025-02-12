import Image from 'next/image';
import { Carousel } from '@/components/dashboard/ui';
import { Fetch } from '@/app/lib';
import { CircleCheck, CircleX } from 'lucide-react';
import Link from 'next/link';

interface Floor {
    id: number;
    level: number;
    description: string;
}

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
    floor: Floor;
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
        <div className="container">
            <div className="p-4 shadow-sm rounded-sm mb-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <Carousel images={room.images} />
                    </div>
                    <div className="flex flex-col justify-between gap-2 px-2">

                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-bold"><span>Label: </span>{room.room_label}</h2>
                            <p className="text-lg"><span className='font-semibold'>Floor:</span> {room.floor.level}</p>
                            <p className="text-lg"><span className='font-semibold'>Room Type:</span> {room.room_type.room_type}</p>
                            <p className="text-lg"><span className='font-semibold'>Capacity:</span> {room.capacity}</p>
                            <p className="text-lg"><span className='font-semibold'>Price:</span> {room.room_type.price}</p>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <h1 className='text-lg font-semibold'>
                                Actions
                            </h1>
                            <div className='flex flex-row justify-between gap-2'>
                                <div className='flex gap-2'>
                                    <button className='btn btn-primary rounded-sm'>
                                        {room.is_available ? 'Book Now' : 'Not Available'}
                                    </button>
                                    <button className='btn btn-secondary rounded-sm'>
                                        Check Availability
                                    </button>
                                </div>
                                <Link href={`/dashboard/rooms/${room.id}/edit`} className='btn btn-accent rounded-sm me-5'>
                                    Edit
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold py-2">Description</h2>
                    <p className="text-lg">{room.description}</p>
                </div>
            </div>
            <div className="p-4 shadow-sm rounded-sm border border-indigo-500 mb-2">
                <h2 className="text-xl font-bold py-2">Amenities</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className='bg-base-200'>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {room.amenities.map((amenity: Amenity) => (
                                <tr key={amenity.id}>
                                    <td>{amenity.title}</td>
                                    <td>{amenity.description}</td>
                                    <td>{amenity.is_available ? <CircleCheck className='text-success' /> : <CircleX className='text-error' />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
