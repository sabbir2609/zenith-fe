import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchData } from "@/lib/server-actions";
import { FileSymlink, PlusCircle } from "lucide-react";
import Link from "next/link";

interface DeviceType {
  id: string;
  name: string;
  description: string;
}

export default async function Page() {
  const deviceTypes = (await fetchData("/iot/device-types/")) as DeviceType[];

  if (deviceTypes && deviceTypes.length === 0) {
    return (
      <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No device types found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Add a device type to get started.
          </p>
          <Button asChild>
            <Link href="/dashboard/devices/type/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Device Type
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Device Types
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your device types here
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/devices/type/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Device Type
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deviceTypes.map((deviceType: DeviceType) => (
              <TableRow key={deviceType.id}>
                <TableCell className="font-medium">{deviceType.name}</TableCell>
                <TableCell>
                  {deviceType.description || "No description"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-8 w-8"
                  >
                    <Link href={`/dashboard/devices/type/${deviceType.id}`}>
                      <FileSymlink className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
