import { Fetch } from "@/app/lib";
import { FileSymlink } from "lucide-react";
import Link from "next/link";

interface Floors {
    id: number;
    level: number;
    elevator: boolean;
}

export default async function Page() {
    const floors: Floors[] = await Fetch({ endpoint: "main/floors/" });
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2 px-2">
                <h1 className="text-3xl font-semibold">Floor List</h1>
                <div className="flex justify-end">
                    <Link className="btn btn-sm btn-primary rounded-sm" href="/dashboard/floors/create">
                        Add New
                    </Link>
                </div>
            </div>
            <div className="overflow-y-auto">
                <table className="table">
                    <thead>
                        <tr className="bg-base-200">
                            <th>ID</th>
                            <th>Level</th>
                            <th>Elevator</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {floors.map((floor: Floors) => (
                            <tr key={floor.id}>
                                <td>{floor.id}</td>
                                <td>Level {floor.level}</td>
                                <td>{floor.elevator ? "No" : "Yes"}</td>
                                <td>
                                    <div className="flex items-center space-x-2">
                                        <Link className="hover:underline hover:text-blue-700" href={`/dashboard/floors/${floor.id}`}>
                                            <FileSymlink />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
