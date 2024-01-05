import Image from "next/image";
import { cookies } from "next/headers";
import userIcon from "./../../../static/image/user_icon.png";
import Link from "next/link";

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

    const guests: Guests[] = await fetch('http://127.0.0.1:8000/api/guests/', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then((res) => res.json())
        .catch((err) => console.error(err));

    return (
        <section>
            <h1 className="text-3xl font-bold tracking-tight">Guest List:</h1>

            <div className="m-3 border rounded">
                <ul role="list" className="divide-y py-1 px-6">
                    {guests.map((guest) => (
                        <li key={guest.id} className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        className="rounded-full"
                                        src={guest.image || userIcon}
                                        alt={`${guest.user.first_name} image`}
                                        width={50}
                                        height={50}
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