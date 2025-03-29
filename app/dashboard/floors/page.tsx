import { fetchData } from "@/lib/server-actions";
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
import FloorDetails from "./components/floor-details";
import CreateFloor from "./components/floor-create";
import EditFloor from "./components/floor-edit";
import { DeleteItem } from "@/components/dashboard";

export default async function Page() {
  const floors: Floor[] = await fetchData("main/floors/");

  return (
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-4 sm:py-6">
      <ToastHandler />

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <CardTitle className="text-xl sm:text-2xl font-bold">Floors</CardTitle>
          <CreateFloor />
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto -mx-6 px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Level</TableHead>
                  <TableHead className="hidden sm:table-cell">Elevator</TableHead>
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
                        <div className="items-center justify-end space-x-2">
                          <FloorDetails floor={floor} />
                          <EditFloor floor={floor} />
                          <DeleteItem itemName="Floor" endpoint={`main/floors/${floor.level}/`} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}