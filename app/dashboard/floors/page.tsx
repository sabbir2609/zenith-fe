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
import { Floors } from "@/lib/types";

export default async function Page() {
  const floors: Floors[] = await fetchData("main/floors/");

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Floor List</CardTitle>
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
                <TableHead>Is Elevator Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {floors.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No floors found
                  </TableCell>
                </TableRow>
              ) : (
                floors.map((floor: Floors) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
