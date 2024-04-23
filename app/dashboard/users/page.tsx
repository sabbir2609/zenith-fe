import { Pagination } from "@/components/dashboard/common"
import { FileSymlink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    username?: string
    phone_number?: string
}

export default function Users() {
    const users: User[] = [
        {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            phone_number: '+1234567890'
        },
        {
            id: 2,
            first_name: 'Alice',
            last_name: 'Smith',
            email: 'alice.smith@example.com',
            username: 'alicesmith',
            phone_number: '+0987654321'
        },
        {
            id: 3,
            first_name: 'Michael',
            last_name: 'Johnson',
            email: 'michael.johnson@example.com',
            username: 'mjohnson',
            phone_number: '+1122334455'
        },
        {
            id: 4,
            first_name: 'Karen',
            last_name: 'Davis',
            email: 'karen.davis@example.com',
            username: 'karendavis',
            phone_number: '+1223344556'
        },
        {
            id: 5,
            first_name: 'Christopher',
            last_name: 'Martinez',
            email: 'christopher.martinez@example.com',
            username: 'cmartinez',
            phone_number: '+1333445566'
        },
        {
            id: 6,
            first_name: 'Sarah',
            last_name: 'Brown',
            email: 'sarah.brown@example.com',
            username: 'sbrown',
            phone_number: '+1444555666'
        },
        {
            id: 7,
            first_name: 'David',
            last_name: 'Wilson',
            email: 'david.wilson@example.com',
            username: 'dwilson',
            phone_number: '+1555666777'
        },
        {
            id: 8,
            first_name: 'Jessica',
            last_name: 'Taylor',
            email: 'jessica.taylor@example.com',
            username: 'jtaylor',
            phone_number: '+1666777888'
        },
        {
            id: 9,
            first_name: 'William',
            last_name: 'Lee',
            email: 'william.lee@example.com',
            username: 'wlee',
            phone_number: '+1777888999'
        },
        {
            id: 10,
            first_name: 'Linda',
            last_name: 'Harris',
            email: 'linda.harris@example.com',
            username: 'lharris',
            phone_number: '+1888999000'
        }
    ]

    return (
        <div className="flex flex-col">
            <h1 className="p-2 text-2xl font-semibold">Reservations</h1>

            <div className="overflow-x-auto mb-16">
                <table className="table w-full">
                    <thead>
                        <tr className="text-base">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.phone_number}</td>
                                <td>
                                    <td>
                                        <Link href={`/dashboard/users/${user.id}`}>
                                            <FileSymlink size={18} className="hover:text-primary" />
                                        </Link>
                                    </td>
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
    )
}
