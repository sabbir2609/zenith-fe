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

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/main/rooms/?page=${pageNumber}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            cache: "no-cache",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error fetching device list');
        }

        const totalRooms = data.count;
        const availableRooms = data.available_rooms_count;

        const totalPages = Math.ceil(totalRooms / 10);

        const rooms: Rooms[] = data.results;

        return (
            <section className="container mx-auto p-4">

                {/* header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold">Room List:</h1>
                        <div className="text-lg font-semibold gap-2">
                            <span className="font-normal">Total Rooms:</span> <span className="text-primary">{totalRooms}</span>
                            <span className="font-normal"> | </span>
                            <span className="font-normal">Current Available Rooms:</span> <span className="text-primary">{availableRooms}</span>
                        </div>
                    </div>

                    {/* add room button */}
                    <Link href="/dashboard/rooms/add">
                        <button className="btn btn-primary">Add Room</button>
                    </Link>
                </div>

                {/* room list */}
                {rooms.length === 0 && (
                    <div className="card bg-blue-500 text-white">
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

                {/* room list */}
                <ul role="list" className="grid grid-cols-1 gap-4 mt-4">
                    {rooms.map((room) => (
                        <li key={room.id}>
                            <RoomCard {...room} />
                        </li>
                    ))}
                </ul>

                {/* pagination */}
                <div className="flex justify-end mb-2 mt-2">
                    <Pagination totalPages={totalPages} baseURL={baseURL} />
                </div>

            </section>
        );
    } catch (error) {
        return (
            <div className="flex items-center justify-center">
                <div className="rounded-lg p-40 shadow-lg text-center">
                    <h1 className="text-3xl font-bold text-red-600">
                        {(error as Error).message == "fetch failed" ? "Error fetching details" : "Not found ! "}
                    </h1>
                </div>
            </div>
        );
    }
}
