import { fetchData } from "@/lib/server-actions";
import { FileSymlink } from "lucide-react";
import Link from "next/link";

interface deviceType {
  id: string;
  name: string;
  description: string;
}

export default async function Page() {
  const deviceTypes = (await fetchData("/iot/device-types/")) as deviceType[];

  if (deviceTypes && deviceTypes.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="rounded-lg shadow-lg p-5 md:p-20 mx-2">
          <h1 className="text-red-500 text-center">No device types found</h1>
          <h2 className="text-blue-500 text-center">
            Please add a device type
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2 px-2">
        <h1 className="text-2xl font-semibold whitespace-nowrap">
          Device Type List
        </h1>
        <p className="text-base-100">List of all floors</p>
        <div className="flex justify-end">
          <Link
            className="btn btn-sm btn-primary rounded-sm"
            href="/dashboard/devices/type/create"
          >
            Add New
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-base-200">
              <th>Device Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deviceTypes.map((deviceType: deviceType) => (
              <tr key={deviceType.id}>
                <td>{deviceType.name}</td>
                <td>
                  {deviceType.description
                    ? deviceType.description
                    : "No description"}
                </td>
                <td>
                  <Link
                    href={`/dashboard/devices/type/${deviceType.id}`}
                    className="hover:underline hover:text-blue-700"
                  >
                    <FileSymlink size={20} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
