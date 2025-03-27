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
    <div className="container mx-auto py-6 px-4">
      {/* toast */}
      <ToastHandler />

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Floor {floor.level}</CardTitle>
          <CardDescription>Floor details and information</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p>
              {floor.description
                ? floor.description
                : "No description available"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
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

        <CardFooter className="flex items-center justify-between space-x-4 pt-2">
          <div className="flex space-x-2">
            <Button asChild variant="outline">
              <Link
                href="/dashboard/floors"
                className="inline-flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
              </Link>
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button asChild variant="default" size="sm">
              <Link
                href={`/dashboard/floors/${id}/edit`}
                className="inline-flex items-center"
              >
                <EditIcon className="mr-2 h-4 w-4" /> Edit Floor
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
