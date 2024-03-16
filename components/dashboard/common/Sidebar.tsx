import Link from "next/link";
import { FcElectricalSensor, FcOpenedFolder, FcGenealogy } from "react-icons/fc";

interface SidebarItem {
    id: number;
    text: string;
    link: string;
    icon?: any;
}

const sidebarDataSectionOne: SidebarItem[] = [
    { id: 1, text: "Guests", link: "/dashboard/guests", icon: FcOpenedFolder },
    { id: 2, text: "Rooms", link: "/dashboard/rooms", icon: FcGenealogy },

];

const sidebarDataSectionTwo: SidebarItem[] = [
    { id: 4, text: "Sidebar Item 4", link: "#" },
    { id: 5, text: "Sidebar Item 5", link: "#" },
    { id: 6, text: "Sidebar Item 6", link: "#" }
];

const sidebarDataSectionThree: SidebarItem[] = [
    { id: 7, text: "Sidebar Item 7", link: "#" },
    { id: 8, text: "Sidebar Item 8", link: "#" },
    { id: 9, text: "Sidebar Item 9", link: "#" },
    { id: 10, text: "Sidebar Item 10", link: "#" },
    { id: 11, text: "Sidebar Item 11", link: "#" },
    { id: 12, text: "Sidebar Item 12", link: "#" },
    { id: 13, text: "Sidebar Item 13", link: "#" },
    { id: 14, text: "Sidebar Item 14", link: "#" },
    { id: 15, text: "Sidebar Item 15", link: "#" },
    { id: 16, text: "Sidebar Item 16", link: "#" },
    { id: 17, text: "Sidebar Item 17", link: "#" },
    { id: 18, text: "Sidebar Item 18", link: "#" },
    { id: 19, text: "Sidebar Item 19", link: "#" },
    { id: 20, text: "Sidebar Item 20", link: "#" }
];

export default function Sidebar() {
    return (
        <aside className="bg-base-100 min-h-screen w-80">

            <div className='bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex shadow-sm'>
                <Link href="/" className='flex-0 btn btn-ghost px-2'>
                    <div className='font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl'>
                        <span className='text-base-content uppercase'>Zenith</span>
                    </div>
                </Link>
            </div>

            <div className='bg-base-200 sticky top-0 z-10 grid grid-row-2 gap-y-2 w-full bg-opacity-90 py-3 px-2 backdrop-blur rounded-sm shadow-sm lg:hidden'>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" />
                    </div>
                </div>
            </div>

            <ul className="menu px-4 py-0">

                {sidebarDataSectionOne.map((item) => (
                    <li key={item.id} className="m-2 font-semibold gap-1">
                        <Link href={item.link}>
                            <item.icon className="inline-block" size={25} />
                            {item.text}
                        </Link>
                    </li>
                ))}

                <div className="divider"></div>

                <li>
                    <details>
                        <summary className="m-2 font-semibold">
                            <FcElectricalSensor
                                className="inline-block"
                                size={25}
                            />
                            Devices
                        </summary>
                        <ul className="menu">
                            <li className="m-2 font-semibold">
                                <Link href="/dashboard/devices">
                                    All Devices
                                </Link>
                            </li>
                            <li className="m-2 font-semibold">
                                <Link href="#">
                                    Room Devices
                                </Link>
                            </li>
                            <li className="m-2 font-semibold">
                                <Link href="#">
                                    Facility Devices
                                </Link>
                            </li>
                        </ul>
                    </details>

                </li>
                <div className="divider"></div>

                {sidebarDataSectionTwo.map((item) => (
                    <li key={item.id} className="m-2 font-semibold">
                        <Link href={item.link}>
                            {item.text}
                        </Link>
                    </li>
                ))}

                <div className="divider"></div>

                {sidebarDataSectionThree.map((item) => (
                    <li key={item.id} className="m-2 font-semibold">
                        <Link href={item.link}>
                            {item.text}
                        </Link>
                    </li>
                ))}

            </ul>
        </aside >
    )
}