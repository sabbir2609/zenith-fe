import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers'
import { RoomCard } from '@/components/dashboard/ui';
import { Pagination } from '@/components/dashboard/common';

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


interface Rooms {
    id: number;
    floor: number;
    room_label: string;
    room_type: RoomType;
    capacity: number;
    description: string;
    is_available: boolean;
    images: Image[];
}


export default async function RoomsPage(context: any) {
    const cookieStore = cookies()
    const token = cookieStore.get('access')?.value

    if (!token) {
        return <h1>You are not logged in</h1>
    }

    const pageNumber = context.searchParams.page ? context.searchParams.page : 1;

    const baseURL = '/dashboard/rooms';

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/main/rooms/?page=${pageNumber}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        cache: "no-cache",
    });

    const data = await response.json();

    if (!response.ok) {
        return (
            <h1 className="text-red-500">Error fetching device list</h1>
        );
    }

    const totalRooms = data.count;
    const availableRooms = data.results.filter((rooms: Rooms) => rooms.is_available === true);

    const totalPages = Math.ceil(totalRooms / 10);

    const rooms: Rooms[] = data.results;

    return (
        <section className="grid content-center">
            {/* header */}
            <h1 className="text-2xl font-bold ms-4">Room List:</h1>
            <div className="text-lg font-semibold ms-4 gap-2">
                <span className="font-normal">Total Rooms:</span> <span className="text-secondary">{totalRooms}</span>
                <span className="font-normal"> | </span>
                <span className="font-normal">Current Available Rooms:</span> <span className="text-secondary">{availableRooms.length}</span>
            </div>
            {rooms.length === 0 && (
                <div className="card bg-secondary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title text-5xl">No rooms available!</h2>
                        <p className="text-xl">Please Add Room</p>
                        <div className="card-actions justify-end">
                            <Link href="/dashboard/rooms/add">
                                <button className="btn btn-primary">Add Room</button>
                            </Link>
                        </div>
                    </div>
                </div>

            )}

            <ul role="list">
                {Array.isArray(rooms) && rooms.map((room) => (

                    <li key={room.id} className="p-4">
                        <RoomCard {...room} />
                    </li>

                ))}
            </ul>

            {/* pagination */}
            <div className="flex justify-center mb-2">
                <Pagination totalPages={totalPages} baseURL={baseURL} />
            </div>

        </section>
    );
}
