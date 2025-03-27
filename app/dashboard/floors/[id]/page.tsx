import { deleteData, fetchData } from "@/lib/server-actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { badgeVariants } from "@/components/ui/badge";
import { ArrowLeft, EditIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Floor } from "@/lib/types";
import { DeleteButton } from "@/components/dashboard/common/delete-button";
import { redirect } from "next/navigation";
import ToastHandler from "@/components/common/toast";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const floor: Floor = await fetchData(`main/floors/${id}`);

  async function deleteFloor(): Promise<boolean> {
    "use server";
    const response = await deleteData(`main/floors/${id}`);

    if (response.ok) {
      redirect("/dashboard/floors");
    } else {
      throw new Error("Failed to delete floor");
    }
  }

  return (
    <div className="container mx-auto py-4 sm:py-6 px-4 sm:px-6">
      {/* toast */}
      <ToastHandler />

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-xl sm:text-2xl">Floor {floor.level}</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Floor details and information
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm sm:text-base">
              {floor.description
                ? floor.description
                : "No description available"}
            </p>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
              Elevator Status
            </h3>
            <Badge
              className={badgeVariants({
                variant: floor.is_elevator_accessible
                  ? "default"
                  : "destructive",
              })}
            >
              {floor.is_elevator_accessible
                ? "Elevator available"
                : "No elevator"}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:space-x-4 pt-2">
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link
                href="/dashboard/floors"
                className="inline-flex items-center justify-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
              </Link>
            </Button>
          </div>

          <div className="flex w-full sm:w-auto space-x-2">
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1 sm:flex-initial"
            >
              <Link
                href={`/dashboard/floors/${id}/edit`}
                className="inline-flex items-center justify-center"
              >
                <EditIcon className="mr-1 sm:mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                <span className="sm:inline">Edit</span>
                <span className="hidden sm:inline"> Floor</span>
              </Link>
            </Button>

            <DeleteButton
              onDelete={deleteFloor}
              itemName={`Floor ${floor.level}`}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}