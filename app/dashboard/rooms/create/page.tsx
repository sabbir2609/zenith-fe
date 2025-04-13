import RoomForm from "@/components/dashboard/forms/room-form";
import { Floor, RoomType } from "@/lib/types";
import { fetchData, postData } from "@/lib/server-actions";
import { redirect } from "next/navigation";

export default async function CreateRoomPage() {
  const floors: Floor[] = await fetchData("main/floors");
  const roomTypes: RoomType[] = await fetchData("main/room-types");

  async function createRoom(data: FormData) {
    "use server";
    const roomData = {
      room_label: data.get("room_label"),
      floor_id: data.get("floor_id"),
      room_type_id: data.get("room_type_id"),
      capacity: data.get("capacity"),
      description: data.get("description"),
      is_available: data.get("is_available") === "true",
      images: data.getAll("images"),
      amenities: data.getAll("amenities"),
    };

    const res = await postData("main/rooms/", roomData);
    const resData = await res.json();
    if (res.ok) {
      redirect(`/dashboard/rooms/${resData.id}?created=true`);
    } else {
      throw new Error("Failed to create room");
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Room</h1>
      <RoomForm floors={floors} roomTypes={roomTypes} createRoom={createRoom} />
    </div>
  );
}
