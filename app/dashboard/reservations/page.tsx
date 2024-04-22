import { Pagination } from "@/components/dashboard/common"
import { FileSymlink } from "lucide-react"
import Link from "next/link"

interface ReservationProps {
    id: number
    user: string
    room: string
    start_date: string
    end_date: string
    payment_status: string
    total_amount: number
}

export default function Reservation() {
    const reservations: ReservationProps[] = [
        {
            id: 1,
            user: 'John Doe',
            room: 'A101',
            start_date: '2021-01-01',
            end_date: '2021-01-03',
            payment_status: 'pending',
            total_amount: 10000
        },
        {
            id: 2,
            user: "Alice Smith",
            room: "B202",
            start_date: "2021-02-15",
            end_date: "2021-02-20",
            payment_status: "paid",
            total_amount: 7500
        },
        {
            id: 3,
            user: "Michael Johnson",
            room: "C303",
            start_date: "2021-03-10",
            end_date: "2021-03-12",
            payment_status: "pending",
            total_amount: 5500
        },
        {
            id: 4,
            user: "Karen Davis",
            room: "D404",
            start_date: "2021-04-05",
            end_date: "2021-04-08",
            payment_status: "pending",
            total_amount: 12000
        },
        {
            id: 5,
            user: "Christopher Martinez",
            room: "E505",
            start_date: "2021-05-10",
            end_date: "2021-05-14",
            payment_status: "paid",
            total_amount: 6500
        },
        {
            id: 6,
            user: "Sarah Brown",
            room: "F606",
            start_date: "2021-06-01",
            end_date: "2021-06-04",
            payment_status: "pending",
            total_amount: 8900
        },
        {
            id: 7,
            user: "David Wilson",
            room: "G707",
            start_date: "2021-07-12",
            end_date: "2021-07-15",
            payment_status: "paid",
            total_amount: 9200
        },
        {
            id: 8,
            user: "Jessica Taylor",
            room: "H808",
            start_date: "2021-08-03",
            end_date: "2021-08-07",
            payment_status: "pending",
            total_amount: 11000
        },
        {
            id: 9,
            user: "William Lee",
            room: "I909",
            start_date: "2021-09-01",
            end_date: "2021-09-05",
            payment_status: "paid",
            total_amount: 6700
        },
        {
            id: 10,
            user: "Linda Harris",
            room: "J1010",
            start_date: "2021-10-12",
            end_date: "2021-10-15",
            payment_status: "pending",
            total_amount: 8100
        },
        {
            id: 11,
            user: "Daniel Thompson",
            room: "K1111",
            start_date: "2021-11-08",
            end_date: "2021-11-11",
            payment_status: "paid",
            total_amount: 9800
        },
        {
            id: 12,
            user: "Emily White",
            room: "L1212",
            start_date: "2021-12-20",
            end_date: "2021-12-24",
            payment_status: "pending",
            total_amount: 10200
        },
        {
            id: 13,
            user: "Matthew Moore",
            room: "M1313",
            start_date: "2022-01-01",
            end_date: "2022-01-04",
            payment_status: "pending",
            total_amount: 7300
        },
        {
            id: 14,
            user: "Samantha Clark",
            room: "N1414",
            start_date: "2022-02-10",
            end_date: "2022-02-12",
            payment_status: "paid",
            total_amount: 7600
        },
        {
            id: 15,
            user: "Brian Allen",
            room: "O1515",
            start_date: "2022-03-15",
            end_date: "2022-03-18",
            payment_status: "pending",
            total_amount: 11500
        }

    ]

    return (
        <div className="flex flex-col">
            <h1 className="p-2 text-2xl font-semibold">Reservations</h1>
            <div className="overflow-x-auto mb-16">
                <table className="table">
                    <thead>
                        <tr className="text-base">
                            <th>ID</th>
                            <th>User</th>
                            <th>Room</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Payment Status</th>
                            <th>Total Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.user}</td>
                                <td>{reservation.room}</td>
                                <td>{reservation.start_date}</td>
                                <td>{reservation.end_date}</td>
                                <td>{reservation.payment_status}</td>
                                <td>{reservation.total_amount}</td>
                                <td>
                                    <Link href={`/dashboard/reservations/${reservation.id}`}>
                                        <FileSymlink />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="fixed bottom-4 right-4">
                <Pagination baseURL="/dashboard/reservations" totalPages={3} />
            </div>
        </div>
    )
}