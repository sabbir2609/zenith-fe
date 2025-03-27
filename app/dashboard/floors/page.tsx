import { fetchData } from "@/lib/server-actions";
import { Eye, FileSymlink, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { badgeVariants } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-4 sm:py-6">
      <ToastHandler />

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <CardTitle className="text-xl sm:text-2xl font-bold">Floors</CardTitle>
          <Button asChild size="sm">
            <Link href="/dashboard/floors/create">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto -mx-6 px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Level</TableHead>
                  <TableHead className="hidden sm:table-cell">Elevator Access</TableHead>
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
                      <TableCell>
                        <div>
                          Level {floor.level}
                          <div className="sm:hidden mt-1">
                            <Badge
                              className={badgeVariants({
                                variant: floor.is_elevator_accessible
                                  ? "default"
                                  : "destructive",
                              })}
                            >
                              {floor.is_elevator_accessible ? "Elevator Access" : "No Elevator"}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
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
                        {/* Desktop view: show all buttons */}
                        <div className="hidden sm:flex items-center justify-end space-x-2">
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/dashboard/floors/${floor.level}/edit`}>
                              <Pencil className="mr-1 h-3.5 w-3.5" />
                              Edit
                            </Link>
                          </Button>

                          <Button asChild size="sm" variant="secondary">
                            <Link href={`/dashboard/floors/${floor.level}`}>
                              <Eye className="mr-1 h-3.5 w-3.5" />
                              View
                            </Link>
                          </Button>

                          <Button asChild size="sm" variant="destructive">
                            <Link href={`/dashboard/floors/${floor.level}/delete`}>
                              <Trash className="mr-1 h-3.5 w-3.5" />
                              Delete
                            </Link>
                          </Button>
                        </div>

                        {/* Mobile view: dropdown menu */}
                        <div className="sm:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/floors/${floor.level}/edit`}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/floors/${floor.level}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link className="text-destructive" href={`/dashboard/floors/${floor.level}/delete`}>
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            {totalPages > 1 && (
              <Pagination totalPages={totalPages} baseURL="/dashboard/floors" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}