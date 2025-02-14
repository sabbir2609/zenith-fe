import { userIcon } from "@/public";
import { cookies } from "next/headers";
import Image from "next/image";


interface Guest {
    id: number;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        email: string;
    };
    image: string;
    contact_info: string;
    nid: string;
    preferences: string;
    status: boolean;
}

export default async function Page({ params }: { params: { id: number } }) {
    const cookieStore = cookies();
    const token = (await cookieStore).get('access')?.value;

    if (!token) {
        return <h1>You are not logged in</h1>
    }

    const id = params.id
    const guest: Guest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/main/guests/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    if (!guest) {
        return <h1>Guest not found</h1>
    }

    return (
        <section>
            <h1 className="text-3xl font-bold tracking-tight">
                Guest Details for {guest.user.first_name} {guest.user.last_name}
            </h1>

            <div className="m-3 border rounded p-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <Image
                            className="rounded-sm w-24"
                            src={guest.image || userIcon}
                            alt={`${guest.user.first_name} image`}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Name: {guest.user.first_name} {guest.user.last_name}</p>
                        <p className="text-sm">Email: {guest.user.email}</p>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm">Contact Info: {guest.contact_info}</p>
                    <p className="text-sm">NID: {guest.nid}</p>
                    <p className="text-sm">Preferences: {guest.preferences}</p>
                    <p className="text-sm">Status: {guest.status ? 'Active' : 'Inactive'}</p>
                </div>
            </div>
        </section>
    )
}