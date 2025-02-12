import { Pagination } from "@/components/dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileSymlink } from "lucide-react";
import Link from "next/link";

interface ReservationProps {
  id: number;
  user: string;
  room: string;
  start_date: string;
  end_date: string;
  payment_status: string;
  total_amount: number;
}

export default function Reservation() {
  const reservations: ReservationProps[] = [
    {
      id: 1,
      user: "John Doe",
      room: "A101",
      start_date: "2021-01-01",
      end_date: "2021-01-03",
      payment_status: "pending",
      total_amount: 10000,
    },
    {
      id: 2,
      user: "Alice Smith",
      room: "B202",
      start_date: "2021-02-15",
      end_date: "2021-02-20",
      payment_status: "paid",
      total_amount: 7500,
    },
    {
      id: 3,
      user: "Michael Johnson",
      room: "C303",
      start_date: "2021-03-10",
      end_date: "2021-03-12",
      payment_status: "pending",
      total_amount: 5500,
    },
    {
      id: 4,
      user: "Karen Davis",
      room: "D404",
      start_date: "2021-04-05",
      end_date: "2021-04-08",
      payment_status: "pending",
      total_amount: 12000,
    },
    {
      id: 5,
      user: "Christopher Martinez",
      room: "E505",
      start_date: "2021-05-10",
      end_date: "2021-05-14",
      payment_status: "paid",
      total_amount: 6500,
    },
    {
      id: 6,
      user: "Sarah Brown",
      room: "F606",
      start_date: "2021-06-01",
      end_date: "2021-06-04",
      payment_status: "pending",
      total_amount: 8900,
    },
    {
      id: 7,
      user: "David Wilson",
      room: "G707",
      start_date: "2021-07-12",
      end_date: "2021-07-15",
      payment_status: "paid",
      total_amount: 9200,
    },
    {
      id: 8,
      user: "Jessica Taylor",
      room: "H808",
      start_date: "2021-08-03",
      end_date: "2021-08-07",
      payment_status: "pending",
      total_amount: 11000,
    },
    {
      id: 9,
      user: "William Lee",
      room: "I909",
      start_date: "2021-09-01",
      end_date: "2021-09-05",
      payment_status: "paid",
      total_amount: 6700,
    },
    {
      id: 10,
      user: "Linda Harris",
      room: "J1010",
      start_date: "2021-10-12",
      end_date: "2021-10-15",
      payment_status: "pending",
      total_amount: 8100,
    },
    {
      id: 11,
      user: "Daniel Thompson",
      room: "K1111",
      start_date: "2021-11-08",
      end_date: "2021-11-11",
      payment_status: "paid",
      total_amount: 9800,
    },
    {
      id: 12,
      user: "Emily White",
      room: "L1212",
      start_date: "2021-12-20",
      end_date: "2021-12-24",
      payment_status: "pending",
      total_amount: 10200,
    },
    {
      id: 13,
      user: "Matthew Moore",
      room: "M1313",
      start_date: "2022-01-01",
      end_date: "2022-01-04",
      payment_status: "pending",
      total_amount: 7300,
    },
    {
      id: 14,
      user: "Samantha Clark",
      room: "N1414",
      start_date: "2022-02-10",
      end_date: "2022-02-12",
      payment_status: "paid",
      total_amount: 7600,
    },
    {
      id: 15,
      user: "Brian Allen",
      room: "O1515",
      start_date: "2022-03-15",
      end_date: "2022-03-18",
      payment_status: "pending",
      total_amount: 11500,
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="p-2 text-2xl font-semibold">Reservations</h1>
      <div className="overflow-x-auto mb-16 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{reservation.user}</TableCell>
                <TableCell>{reservation.room}</TableCell>
                <TableCell>{reservation.start_date}</TableCell>
                <TableCell>{reservation.end_date}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      reservation.payment_status === "paid"
                        ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                        : "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
                    }`}
                  >
                    {reservation.payment_status}
                  </span>
                </TableCell>
                <TableCell>${reservation.total_amount}</TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/reservations/${reservation.id}`}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    <FileSymlink className="h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="fixed bottom-4 right-4">
        <Pagination baseURL="/dashboard/reservations" totalPages={3} />
      </div>
    </div>
  );
}