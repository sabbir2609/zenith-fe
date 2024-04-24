export default function AddRoomPageModal() {
    return (
        <dialog id="add_room_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add a new room</h3>
                <p className="py-4">Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}