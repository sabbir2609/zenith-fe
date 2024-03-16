import { cookies } from 'next/headers'
import Image from 'next/image';
import { RoomImage } from '@/public/static';

interface RoomType {
    id: number;
    room_type: string;
    price: string;
    description: string;
}

interface Image {
    id: number;
    room: number;
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

export default async function roomDetailPage(
    { params }: { params: { id: number } }
) {
    const cookieStore = cookies()
    const token = cookieStore.get('access')?.value

    if (!token) {
        return <h1>You are not logged in</h1>
    }

    const id = params.id
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/main/rooms/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })


    if (!response.ok) {
        return (
            <h1 className="text-red-500">Error fetching room </h1>
        )
    }

    const room: Room = await response.json()

    return (
        <section>
            <h1 className="text-3xl font-bold tracking-tight">
                Room Details for {room.room_label}
            </h1>

            <div className="m-3 border rounded p-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <Image
                            className="rounded-sm w-24"
                            src={room.images.length > 0 ? room.images[0].image : RoomImage.src}
                            alt={`${room.room_label} image`}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{room.room_label}</h2>
                        <p className="text-lg">{room.description}</p>
                        <p className="text-lg">Capacity: {room.capacity}</p>
                        <p className="text-lg">Floor: {room.floor}</p>
                        <p className="text-lg">Room Type: {room.room_type.room_type}</p>
                        <p className="text-lg">Price: {room.room_type.price}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
