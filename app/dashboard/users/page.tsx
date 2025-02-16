import { Pagination } from "@/components/dashboard";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchData } from "@/lib/server-actions";
import { FileSymlink } from "lucide-react";
import Link from "next/link";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export default async function Users() {
  const users = (await fetchData("/auth/users/")) as User[];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">User List</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell className="whitespace-nowrap font-medium">
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/users/${user.id}`}
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
        <Pagination baseURL="/dashboard/users" totalPages={3} />
      </div>
    </div>
  );
}
