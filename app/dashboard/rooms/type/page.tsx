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
        return <h1>You are not logged in</h1>
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
    try {
        const room_types: RoomType[] = await fetchRoomTypes();
        return (
            <section className='grid content-center'>
                <h2 className="text-2xl font-semibold font-mono mb-4 text-primary">
                    Room Types
                </h2>
                {room_types.map((room_type) => (
                    <div key={room_type.id} className="card bg-base-100 shadow-sm border mb-2">
                        <div className="card-body">
                            <h5 className="card-title">{room_type.room_type}</h5>
                            <p className="card-text">{room_type.description}</p>
                        </div></div>
                ))}
            </section>
        );
    } catch (error) {
        return (
            <div className="flex items-center justify-center">
                <div className="rounded-lg p-40 shadow-lg text-center">
                    <h1 className="text-3xl font-bold text-red-600">
                        {(error as Error).message}
                    </h1>
                </div>
            </div>
        )
    }

}