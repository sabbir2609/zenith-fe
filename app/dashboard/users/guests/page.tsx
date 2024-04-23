import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";
import { userIcon } from "@/public/static";

interface Guests {
    id: number;
    user: {
        first_name: string;
        last_name: string;
        email: string;
    };
    image: string;
    contact_info: string;
    status: boolean;
}

export default async function Page() {
    const cookieStore = cookies();
    const token = cookieStore.get('access')?.value;

    if (!token) {
        return <h1>You are not logged in</h1>
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/main/guests/`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        return (
            <h1 className="text-red-500">Error fetching guest list</h1>
        );
    }

    const guests: Guests[] = await response.json();

    return (
        <section>
            <h1 className="text-3xl font-bold tracking-tight">Guest List:</h1>

            <div className="m-3 border rounded">
                <ul role="list" className="divide-y py-1 px-6">
                    {Array.isArray(guests) && guests.map((guest) => (
                        <li key={guest.id} className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        className="rounded-full w-12 h-12"
                                        src={guest.image || userIcon}
                                        alt={`${guest.user.first_name} image`}
                                        width={48}
                                        height={48}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        Name: {guest.user.first_name} {guest.user.last_name}
                                    </p>
                                    <p className="text-sm truncate">Email: {guest.user.email}</p>
                                    <p className="text-sm truncate">Contact: {guest.contact_info}</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold"></div>
                                <Link href={`/dashboard/guests/${guest.id}`} className="text-blue-500">
                                    View Details
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    )
}