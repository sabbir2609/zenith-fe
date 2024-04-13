import { cookies } from "next/headers";

interface RoomType {
    id: number;
    room_type: string;
    description: string;
}

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

    return await response.json();
}

export default async function Page() {
    let room_types: RoomType[] = [];

    try {
        room_types = await fetchRoomTypes();
    } catch (error) {
        return (
            <section className='grid content-center'>
                <h1>{(error as Error).message}</h1>
            </section>
        );
    }

    return (
        <section className='grid content-center'>
            <h2 className="text-2xl font-semibold font-mono mb-4 text-primary">
                Room Types
            </h2>
            {Array.isArray(room_types) ? (
                room_types.map((room_type) => (
                    <div key={room_type.id} className="card bg-base-100 shadow-sm border mb-2">
                        <div className="card-body">
                            <h5 className="card-title">{room_type.room_type}</h5>
                            <p className="card-text">{room_type.description}</p>
                        </div>
                    </div>
                ))
            ) : (
                <h1>Invalid data received from the server</h1>
            )}
        </section>
    );
}
