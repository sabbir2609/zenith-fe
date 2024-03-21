import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers'
import { RoomCard } from '@/components/dashboard/ui';

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


interface Room {
    id: number;
    floor: number;
    room_label: string;
    room_type: RoomType;
    capacity: number;
    description: string;
    is_available: boolean;
    images: Image[];
}


export default async function RoomsPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('access')?.value

    if (!token) {
        return <h1>You are not logged in</h1>
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/main/rooms/`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        cache: "no-cache",
    })

    if (!response.ok) {
        return (
            <h1 className="text-red-500">Error fetching rooms</h1>
        )
    }

    const rooms: Room[] = await response.json()

    return (
        <section className='grid content-center'>
            <h1 className="text-2xl font-bold ms-4">Rooms:</h1>

            {rooms.length === 0 && (<h1 className="text-red-500">No rooms found</h1>)}


            <ul role="list">
                {Array.isArray(rooms) && rooms.map((room) => (

                    <li key={room.id} className="p-4">
                        <RoomCard {...room} />
                    </li>

                ))}
            </ul>

        </section>
    );
}
