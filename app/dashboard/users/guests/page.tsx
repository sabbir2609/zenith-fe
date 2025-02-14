import Image from "next/image";
// import { cookies } from "next/headers";
import Link from "next/link";
import { FileSymlink } from "lucide-react";
import { Pagination } from "@/components/dashboard";
import { userIcon } from "@/public";

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
  // const cookieStore = cookies();
  // const token = cookieStore.get('access')?.value;

  // if (!token) {
  //     return <h1>You are not logged in</h1>
  // }

  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/main/guests/`, {
  //     headers: {
  //         "Content-Type": "application/json",
  //         'Authorization': `Bearer ${token}`
  //     },
  // });

  // if (!response.ok) {
  //     return (
  //         <h1 className="text-red-500">Error fetching guest list</h1>
  //     );
  // }

  // const guests: Guests[] = await response.json();
  const guests: Guests[] = [
    {
      id: 1,
      user: {
        first_name: "Alice",
        last_name: "Johnson",
        email: "alice.johnson@example.com",
      },
      image: "https://source.unsplash.com/200x200?face&women",
      contact_info: "+12345678901",
      status: true,
    },
    {
      id: 2,
      user: {
        first_name: "Bob",
        last_name: "Smith",
        email: "bob.smith@example.com",
      },
      image: "",
      contact_info: "+12345678902",
      status: false,
    },
    {
      id: 3,
      user: {
        first_name: "Catherine",
        last_name: "Brown",
        email: "catherine.brown@example.com",
      },
      image: "https://source.unsplash.com/200x200?face&women",
      contact_info: "+12345678903",
      status: true,
    },
    {
      id: 4,
      user: {
        first_name: "David",
        last_name: "Williams",
        email: "david.williams@example.com",
      },
      image: "https://source.unsplash.com/200x200?face&men",
      contact_info: "+12345678904",
      status: true,
    },
    {
      id: 5,
      user: {
        first_name: "Evelyn",
        last_name: "Davis",
        email: "evelyn.davis@example.com",
      },
      image: "https://source.unsplash.com/200x200?face&women",
      contact_info: "+12345678905",
      status: false,
    },
    {
      id: 6,
      user: {
        first_name: "Frank",
        last_name: "Miller",
        email: "frank.miller@example.com",
      },
      image: "https://source.unsplash.com/200x200?face&men",
      contact_info: "+12345678906",
      status: true,
    },
    {
      id: 7,
      user: {
        first_name: "Grace",
        last_name: "Wilson",
        email: "grace.wilson@example.com",
      },
      image: "https://source.unsplash.com/200x200?face&women",
      contact_info: "+12345678907",
      status: true,
    },
    {
      id: 8,
      user: {
        first_name: "Henry",
        last_name: "Moore",
        email: "henry.moore@example.com",
      },
      image: "https://source.unsplash.com/200x200?face&men",
      contact_info: "+12345678908",
      status: false,
    },
    {
      id: 9,
      user: {
        first_name: "Isabella",
        last_name: "Anderson",
        email: "isabella.anderson@example.com",
      },
      image: "https://source.unsplash.com/200x200?face&women",
      contact_info: "+12345678909",
      status: true,
    },
    {
      id: 10,
      user: {
        first_name: "Jack",
        last_name: "Thomas",
        email: "jack.thomas@example.com",
      },
      image: "https://source.unsplash.com/200x200?face&men",
      contact_info: "+12345678910",
      status: true,
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="p-2 text-2xl font-semibold">Guest List</h1>

      <div className="overflow-x-auto mb-16">
        <table className="table w-full">
          <thead>
            <tr className="text-base">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Info</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.id}</td>
                <td>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={guest.image || userIcon}
                      alt="user"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <p className="whitespace-nowrap">
                      {guest.user.first_name} {guest.user.last_name}
                    </p>
                  </div>
                </td>
                <td>{guest.user.email}</td>
                <td>{guest.contact_info}</td>
                <td>{guest.status ? "In" : "Out"}</td>
                <td>
                  <Link href={`/dashboard/users/guests/${guest.id}`}>
                    <FileSymlink />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fixed bottom-4 right-4">
        <Pagination baseURL="/dashboard/users" totalPages={3} />
      </div>
    </div>
  );
}