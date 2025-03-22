import { fetchData } from "@/lib/server-actions";
import { FileSymlink, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { badgeVariants } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Floor } from "@/lib/types";
import ToastHandler from "@/components/common/toast";
import Pagination from "@/components/dashboard/common/Pagination";
import { PAGINATION } from "@/lib/constants";

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // Await searchParams as required by Next.js 15
  const resolvedParams = await searchParams;
  const page = resolvedParams.page ? parseInt(resolvedParams.page) : 1;

  // Fetch paginated data
  const response: PaginatedResponse<Floor> = await fetchData(
    `main/floors/?page=${page}`
  );

  const floors = response.results;
  const totalPages = Math.ceil(response.count / PAGINATION.ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto py-6">
      <ToastHandler />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Floors</CardTitle>
          <Button asChild size="sm">
            <Link href="/dashboard/floors/create">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Elevator Access</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {floors.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No floors found
                  </TableCell>
                </TableRow>
              ) : (
                floors.map((floor) => (
                  <TableRow key={floor.level}>
                    <TableCell>Level {floor.level}</TableCell>
                    <TableCell>
                      <Badge
                        className={badgeVariants({
                          variant: floor.is_elevator_accessible
                            ? "default"
                            : "destructive",
                        })}
                      >
                        {floor.is_elevator_accessible ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/floors/${floor.level}`}>
                          <FileSymlink className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination totalPages={totalPages} baseURL="/dashboard/floors" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
