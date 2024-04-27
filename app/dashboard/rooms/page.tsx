import Link from 'next/link';
import { cookies } from 'next/headers'
import { Pagination } from '@/components/dashboard/common';
import { FileSymlink } from 'lucide-react';
import { Fetch } from '@/app/lib';

interface RoomType {
    id: number;
    room_type: string;
    price: string;
}

interface Floor {
    id: number;
    level: number;
}

interface Rooms {
    id: number;
    floor: Floor;
    room_label: string;
    room_type: RoomType;
    capacity: number;
    is_available: boolean;
}


export function generateMetadata() {
    return {
        title: 'Rooms',
        description: 'List of all rooms',
    }
}

export default async function RoomsPage(context: any) {
    const page = context.searchParams.page ? context.searchParams.page : 1;
    const data = await Fetch({ endpoint: `main/rooms/?page=${page}` });
    const rooms: Rooms[] = data.results;

    const baseURL = '/dashboard/rooms';
    const totalRooms = data.count;
    const availableRooms = data.available_rooms_count;
    const totalPages = Math.ceil(totalRooms / 10);


    return (
        <div className="flex flex-col">
            {rooms.length === 0 && (
                <div className="card text-white">
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

            <div className="flex flex-row items-center justify-between">
                <h1 className="p-2 text-2xl font-semibold whitespace-nowrap">Room List</h1>
                <div className="flex flex-wrap gap-2 p-2 place-content-end">
                    <p className="font-normal">
                        Total Rooms: <span className="text-primary">{totalRooms}</span>
                    </p>
                    <p className="font-normal">Currently Available Rooms: <span className="text-primary">{availableRooms}</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-end me-6">
                <Link href="/dashboard/rooms/new">
                    <button className="btn btn-sm rounded-sm btn-primary">Add Room</button>
                </Link>
            </div>

            <div className="overflow-x-auto mb-16">
                <table className="table">
                    <thead>
                        <tr className="text-base">
                            <th>ID</th>
                            <th>Floor</th>
                            <th>Label</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Capacity</th>
                            <th>Is Available</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr className='whitespace-nowrap' key={room.id}>
                                <td>{room.id}</td>
                                <td>{room.floor.level}</td>
                                <td>{room.room_label}</td>
                                <td>{room.room_type.room_type}</td>
                                <td>{room.room_type.price}</td>
                                <td>{room.capacity}</td>
                                <td>
                                    <button
                                        className="btn btn-sm rounded-sm"
                                        disabled={!room.is_available}
                                    >{room.is_available ? 'Book Now' : 'Unavailable'}</button>
                                </td>
                                <td>
                                    <Link href={`/dashboard/rooms/${room.id}/`}>
                                        <FileSymlink />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="fixed bottom-4 right-4">
                <Pagination baseURL={baseURL} totalPages={totalPages} />
            </div>
        </div>
    )
} 