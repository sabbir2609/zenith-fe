import { Button } from "@/components/dashboard/ui";
import { Pencil, Trash } from "lucide-react";
import { cookies } from "next/headers";

interface RoomType {
    id: number;
    room_type: string;
    description: string;
}

export function generateMetadata() {
    return {
        title: 'Room Types',
        description: 'Manage room types',
    }
}

export default async function Page() {

    async function fetchRoomTypes() {
        const cookieStore = cookies()
        const token = cookieStore.get('access')?.value

        if (!token) {
            throw new Error("You are not logged in");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/main/room-types/`, {
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        return data;
    }

    async function deleteRoomType(id: number) {
        const cookieStore = cookies()
        const token = cookieStore.get('access')?.value

        if (!token) {
            throw new Error("You are not logged in");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/main/room-types/${id}/`, {
            method: "DELETE",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete room type");
        }

        return Promise.resolve();
    }

    const room_types: RoomType[] = await fetchRoomTypes();

    return (
        <div className="flex flex-col">
            <h1 className="p-2 text-2xl font-semibold">Room Types:</h1>
            <table className="table">
                <thead>
                    <tr className="text-base">
                        <th>ID</th>
                        <th>Room Type</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {room_types.map((room_type: RoomType) => (
                        <tr key={room_type.id}>
                            <td>{room_type.id}</td>
                            <td>{room_type.room_type}</td>
                            <td>{room_type.description}</td>
                            <td>
                                <div className="join join-vertical lg:join-horizontal items-center">
                                    <button className="btn btn-sm join-item">
                                        <Pencil size={18} />
                                    </button>
                                    <Button className="btn btn-sm join-item">
                                        <Trash size={18} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
