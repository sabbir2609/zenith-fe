import Link from 'next/link';
import { RoomImage } from '@/public/static';
import Image from 'next/image';

interface RoomType {
    id: number;
    room_type: string;
    price: string;
}

interface Image {
    id: number;
    image: string;
    description: string | null;
}

interface RoomCardProps {
    id: number;
    floor: number;
    room_label: string;
    room_type: RoomType;
    capacity: number;
    description: string;
    is_available: boolean;
    images: Image[];
}

export default function RoomCard({ id, floor, room_label, room_type, capacity, description, is_available, images }: RoomCardProps) {
    return (
        <div className="card border border-primary lg:card-side bg-base-100 shadow-xl grid grid-cols-1 lg:grid-cols-4 grid-rows-2 lg:grid-rows-1 lg:grid-flow-col">
            <figure className="row-span-1 lg:row-span-1 lg:col-span-1 relative overflow-hidden w-full">
                <Image
                    src={images[0]?.image || RoomImage}
                    alt={room_label}
                    layout="fill"
                    objectFit="cover"
                />
            </figure>
            <div className="card-body row-span-1 lg:row-span-1 lg:col-span-3">
                <h2 className="card-title">Label - {floor} | Room - {room_label}</h2>
                <h3>{room_type.room_type}</h3>
                <h4>Capacity: {capacity}</h4>
                <p>{description}</p>
                <p>Price: BDT {room_type.price}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary"
                        disabled={!is_available}
                    >{is_available ? 'Book Now' : 'Unavailable'}</button>
                    <Link href={`/dashboard/rooms/${id}`} className="btn btn-secondary">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}