import Loading from "@/app/loading";
import { postData } from "@/lib/server-actions";
import { redirect } from "next/navigation";

interface Floor {
  level: number;
  is_elevator_accessible: boolean;
  description: string;
}

export default function Page() {
  async function createFloor(formData: FormData) {
    "use server";

    const floor: Floor = {
      level: Number(formData.get("level")),
      is_elevator_accessible: formData.get("is_elevator_accessible") === "true",
      description: formData.get("description") as string,
    };

    console.log(floor);

    const response = await postData("main/floors/", floor);

    if (!response) {
      <Loading />;
    }

    if (response.ok) {
      const { id } = await response.json();
      console.log("Floor created successfully");
      redirect(`/dashboard/floors/${id}`);
    } else {
      console.error("Failed to create floor");
      throw new Error("Failed to create Floor");
    }
  }

  return (
    <div className="flex items-center justify-center">
      <form
        className="space-y-2 p-2 w-full md:w-4/5 lg:w-3/4"
        action={createFloor}
      >
        <h1 className="text-2xl font-semibold">Add New Floor</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Level</span>
          </label>
          <input
            name="level"
            type="number"
            placeholder="Floor Level"
            className="input input-bordered"
            maxLength={2}
            pattern="[0-9]{2}"
            title="Floor Level should be a number between 0 and 99."
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Elevator Accessible</span>
          </label>
          <select
            name="is_elevator_accessible"
            className="select select-bordered"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered"
          ></textarea>
        </div>
        <div className="flex justify-end mt-4 me-4">
          <button className="btn btn-md btn-primary rounded-sm" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
