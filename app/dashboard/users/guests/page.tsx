import Image from "next/image";
import Link from "next/link";
import { FileSymlink } from "lucide-react";
import { Pagination } from "@/components/dashboard";
import { userIcon } from "@/public";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchData } from "@/lib/server-actions";

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
  const guests = (await fetchData("/main/guests/")) as Guests[];
  
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Guest List</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">{guest.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={guest.image || userIcon}
                        alt="user"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="whitespace-nowrap font-medium">
                      {guest.user.first_name} {guest.user.last_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{guest.user.email}</TableCell>
                <TableCell>{guest.contact_info}</TableCell>
                <TableCell>
                  <Badge variant={guest.status ? "default" : "secondary"}>
                    {guest.status ? "In" : "Out"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/users/guests/${guest.id}`}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    <FileSymlink className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="fixed bottom-4 right-4">
        <Pagination baseURL="/dashboard/guests" totalPages={3} />
      </div>
    </div>
  );
}
