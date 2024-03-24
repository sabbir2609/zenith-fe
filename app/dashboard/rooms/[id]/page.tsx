import { cookies } from 'next/headers'
import Image from 'next/image';
import { Carousel } from '@/components/dashboard/ui';

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
        },
        "cache": "no-cache"
    })


    if (!response.ok) {
        return (
            <h1 className="text-red-500">Error fetching room </h1>
        )
    }

    const room: Room = await response.json()

    return (
        <section className='container mx-auto'>

            <h1 className="text-3xl font-mono mb-3">
                Room Details for {room.floor}|{room.room_label}
            </h1>

            <div className="lg:columns-2 md:columns-2 gap-2">

                <Carousel images={room.images} />

                <div className="p-2 rounded-lg ">

                    <div className="subpixel-antialiased mb-4">
                        <p className="font-sans text-primary">
                            {room.room_type.room_type}
                        </p>
                        <p className="font-semibold">Floor: {room.floor}</p>
                        <h1 className="text-3xl font-extrabold">
                            Label: {room.room_label}
                        </h1>
                    </div>

                    <div className="mb-2">
                        <p className="font-semibold">Capacity: {room.capacity}</p>
                    </div>

                    <details className="mb-2 menu">
                        <summary className="font-semibold">Description</summary>
                        <p>{room.description}</p>
                    </details>
                    <div className="divider"></div>
                    <button className="btn btn-outline">
                        Check availability
                    </button>

                </div>

            </div>

        </section>
    )
}
