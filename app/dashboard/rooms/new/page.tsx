import { Fetch, Post } from '@/app/lib';
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';

interface Room {
    floor: number;
    room_label: string;
    room_type: number;
    capacity: number;
    description: string;
    is_available: boolean;
}

export default async function AddRoomPage() {

    const floors = await Fetch({ endpoint: 'main/floors/' });
    const roomTypes = await Fetch({ endpoint: 'main/room-types/' });

    if (!floors || !roomTypes) {
        return <Loading />;
    }

    async function createRoom(formData: FormData) {
        'use server'

        const room: Room = {
            floor: Number(formData.get('floor')),
            room_label: formData.get('room_label') as string,
            room_type: Number(formData.get('room_type')),
            capacity: Number(formData.get('capacity')),
            description: formData.get('description') as string,
            is_available: formData.get('is_available') === '1',
        };

        const response = await Post('main/rooms/', room);

        if (!response) {
            <Loading />
        }

        if (response.ok) {
            const { id } = await response.json();
            console.log('Room created successfully');
            redirect(`/dashboard/rooms/${id}`)
        } else {
            console.error('Failed to create room');
            throw new Error('Failed to create Room');
        }
    }

    return (
        <div className="flex items-center justify-center">
            <form className="space-y-2 p-2 w-full lg:w-2/3" action={createRoom}>
                <div className="flex flex-row gap-2">

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Floor</span>
                        </div>
                        <select name='floor' className="select select-bordered w-full">
                            {floors.map((floor: { id: number, level: number }) => (
                                <option key={floor.id} value={floor.id}>{floor.level}</option>
                            ))}
                        </select>
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Room Type</span>
                        </div>
                        <select name='room_type' className="select select-bordered w-full">
                            {roomTypes.map((roomType: { id: number, room_type: string }) => (
                                <option key={roomType.id} value={roomType.id}>{roomType.room_type}</option>
                            ))}
                        </select>
                    </label>

                </div>

                <div className="flex flex-row gap-2">

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Label</span>
                        </div>
                        <input
                            name='room_label'
                            type="text"
                            placeholder=""
                            className="input input-bordered w-full uppercase"
                            maxLength={1}
                            pattern="[A-Z]"
                            title="Please enter a single capital letter"
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Capacity</span>
                        </div>
                        <input
                            name='capacity'
                            type="number"
                            placeholder=""
                            className="input input-bordered w-full"
                            min={1}
                            max={10}
                        />
                    </label>

                </div>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea name='description' placeholder="" className="textarea textarea-bordered w-full"></textarea>
                </label>

                <div className="flex flex-row justify-between">
                    <label className="cursor-pointer form-control">
                        <div className="label">
                            <span className="label-text">Is Available</span>
                        </div>
                        <input name="is_available" value="1" type="checkbox" className="toggle toggle-primary" />
                    </label>
                    <button type="submit" className="btn rounded-sm btn-primary mt-3">Create</button>
                </div>
            </form>
        </div>
    );
}