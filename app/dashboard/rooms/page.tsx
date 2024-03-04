import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers'
import { RoomImage } from '@/static';

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


export default async function RoomsPage() {

    // Imitate delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const cookieStore = cookies()
    const token = cookieStore.get('access')?.value

    if (!token) {
        return <h1>You are not logged in</h1>
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/main/rooms/`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return (
            <h1 className="text-red-500">Error fetching rooms</h1>
        )
    }

    const rooms: Room[] = await response.json()

    return (
        <section>
            <h1 className="text-3xl font-bold tracking-tight">Rooms:</h1>

            {rooms.length === 0 && (<h1 className="text-red-500">No rooms found</h1>)}

            <div className="m-3 border rounded">
                <ul role="list" className="divide-y py-1 px-6">
                    {Array.isArray(rooms) && rooms.map((room) => (
                        <li key={room.id} className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img
                                        className="rounded-full w-12 h-12"
                                        src={room.images.length > 0 ? room.images[0].image : RoomImage.src}
                                        alt={`${room.room_label} image`}
                                        width={48}
                                        height={48}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        Room: {room.room_label}
                                    </p>
                                    <p className="text-sm truncate">Type: {room.room_type.room_type}</p>
                                    <p className="text-sm truncate">Price: {room.room_type.price}</p>
                                    <p className="text-sm truncate">Description: {room.room_type.description}</p>
                                    <p className="text-sm truncate">Capacity: {room.capacity}</p>
                                    <p className="text-sm truncate">Available: {room.is_available ? "Yes" : "No"}</p>
                                    <Link href={`/dashboard/rooms/${room.id}`} className="text-blue-500">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>

    );
}
