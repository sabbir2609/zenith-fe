import RoomForm from "@/components/dashboard/forms/room-form";
import { Floor, RoomType } from "@/lib/types";
import { createRoom, fetchData } from "@/lib/server-actions";

export default async function CreateRoomPage() {
  const floors: Floor[] = await fetchData("main/floors/all");
  const roomTypes: RoomType[] = await fetchData("main/room-types");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Room</h1>
      <RoomForm floors={floors} roomTypes={roomTypes} createRoom={createRoom} />
    </div>
  );
}
