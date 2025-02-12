import { Fetch } from "@/app/lib";
import Link from "next/link";

interface Floor {
    id: string;
    level: string;
    is_elevator_available: boolean;
    description: string;

}

export default async function Page(
    { params }: { params: { id: string } }
) {
    const floor: Floor = await Fetch({ endpoint: `main/floors/${params.id}` })
    return (
        <div className="p-10">
            <h1><span className="font-bold">Floor: </span>{floor.level}</h1>
            <p><span className="font-bold">Description: </span>{floor.description ? floor.description : "No description available"}</p>
            <p><span className="font-bold">Elevator: </span>{floor.is_elevator_available ? 'Elevator available' : 'No elevator'}</p>
            <Link href={`/dashboard/floors/${params.id}/edit`} className="btn btn-md rounded-sm btn-primary mt-4">
                Edit
            </Link>
        </div>
    );
}
