import Link from "next/link";

interface SidebarItem {
    id: number;
    text: string;
    link: string;
}

const sidebarData: SidebarItem[] = [
    { id: 1, text: "Guests", link: "/dashboard/guests" },
    { id: 2, text: "Rooms", link: "/dashboard/rooms" },
    { id: 3, text: "Sidebar Item 3", link: "#" }
];

export default function Sidebar() {
    return (
        <div>
            <li className="lg:hidden">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered md:w-auto" />
                </div>
            </li>

            {sidebarData.map((item) => (
                <li key={item.id} className="m-2 font-semibold">
                    <Link href={item.link}>
                        {item.text}
                    </Link>
                </li>
            ))}
        </div>
    )
}