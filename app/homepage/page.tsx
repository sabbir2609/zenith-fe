import Link from "next/link";

export default function Page() {
    return (

        <div className="flex flex-col items-start p-5">
            <h1 className="text-4xl text-center mt-10">Links</h1>
            <Link className="text-center mt-5 hover:underline text-blue-600" href="/homepage/rooms">Rooms</Link>
        </div>

    );
}