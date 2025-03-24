import Image from "next/image";
import Link from "next/link";
import {
  FileSymlink,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
} from "lucide-react";
import { Pagination } from "@/components/dashboard";
import { userIcon } from "@/public";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const guests = (await fetchData("main/guests/")) as Guests[];

  // Calculate statistics
  const totalGuests = guests.length;
  const activeGuests = guests.filter((guest) => guest.status).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header with stats cards */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Guest List</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Guest
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Guests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGuests}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Check-ins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeGuests}</div>
              <p className="text-xs text-muted-foreground">
                {((activeGuests / totalGuests) * 100).toFixed(1)}% occupancy
                rate
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guests..."
            className="pl-8 w-full sm:max-w-sm"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Guests</DropdownMenuItem>
              <DropdownMenuItem>Checked In</DropdownMenuItem>
              <DropdownMenuItem>Checked Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button variant="outline" size="icon" title="Refresh">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">
                  Contact Info
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No guests found. Add a new guest to get started.
                  </TableCell>
                </TableRow>
              ) : (
                guests.map((guest) => (
                  <TableRow key={guest.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{guest.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full overflow-hidden bg-muted">
                          <Image
                            src={guest.image || userIcon}
                            alt={`${guest.user.first_name} ${guest.user.last_name}`}
                            width={36}
                            height={36}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">
                            {guest.user.first_name} {guest.user.last_name}
                          </div>
                          <div className="text-sm text-muted-foreground md:hidden">
                            {guest.user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {guest.user.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {guest.contact_info}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={guest.status ? "default" : "secondary"}
                        className="px-2 py-0.5"
                      >
                        {guest.status ? "Checked In" : "Checked Out"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/dashboard/users/guests/${guest.id}`}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent hover:text-accent-foreground"
                      >
                        <FileSymlink className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-center pt-2">
        <Pagination baseURL="/dashboard/guests" totalPages={3} />
      </div>
    </div>
  );
}
