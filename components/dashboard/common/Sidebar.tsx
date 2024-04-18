import { Airplay, Bath, CalendarCheck2, ChevronRight, HelpCircle, LayoutDashboard, LogOut, Search, Settings2, } from "lucide-react";
import Link from "next/link";
import React from "react";


const menuItemsOne = {
    "Devices": {
        "icon": <Airplay size={20} className="inline-block" />,
        "deviceTypes": {
            "title": "Device Types",
            "link": "/dashboard/devices/type"
        },
        "allDevices": {
            "title": "All Devices",
            "link": "/dashboard/devices"
        },
        "roomDevices": {
            "title": "Room Devices",
            "link": "#"
        },
        "facilityDevices": {
            "title": "Facility Devices",
            "link": "#"
        }
    },
    "Rooms": {
        "icon": <Bath size={20} className="inline-block" />,
        "roomTypes": {
            "title": "Room Types",
            "link": "/dashboard/rooms/type"
        },
        "allRooms": {
            "title": "All Rooms",
            "link": "/dashboard/rooms"
        }
    },
};

const menuItemsTwo = {
    "Dummy Items": {
        "icon": <Settings2 size={20} className="inline-block" />,
        "dummyOne": {
            "title": "Dummy One",
            "link": "#"
        },
        "dummyTwo": {
            "title": "Dummy Two",
            "link": "#"
        },
        "dummyThree": {
            "title": "Dummy Three",
            "link": "#"
        },
        "dummyFour": {
            "title": "Dummy Four",
            "link": "#"
        }
    }
};

export default function Sidebar() {
    return (
        <aside className="min-h-screen w-72 flex flex-col bg-base-300">
            <div className="flex-grow">
                {/* Sidebar header */}
                <div className='sticky top-0 z-20 hidden gap-2 px-4 py-2 lg:flex shadow-sm bg-base-200'>
                    <Link href="/" className='btn btn-ghost px-2'>
                        <p className='text-justify font-extrabold text-2xl'>Zenith Admin</p>
                    </Link>
                </div>

                {/* Search section */}
                <div className="sticky top-0 z-20 lg:hidden items-center py-2 bg-base-200 shadow-sm">
                    <form role="search" className="relative m-2 lg:hidden">
                        <div className="form-control">
                            <input type="search" name="q" className="input input-bordered" placeholder="Search..." />
                        </div>
                        <button className="btn rounded-l-none absolute right-0 top-0">
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                {/* Menu section */}
                <ul className="menu gap-2">

                    <li>
                        <Link href="/dashboard" className="font-semibold">
                            <LayoutDashboard className="inline-block" size={20} />
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link href="/reservations" className="font-semibold">
                            <CalendarCheck2 className="inline-block" size={20} />
                            Reservation
                        </Link>
                    </li>

                    {Object.entries(menuItemsOne).map(([itemTitle, { icon, ...items }]) => (
                        <li key={itemTitle}>
                            <details>
                                <summary className="font-semibold">
                                    {icon}
                                    {itemTitle}
                                </summary>
                                <ul className="menu gap-1 [&_li>*]:rounded-sm">
                                    {Object.entries(items).map(([id, { title, link }]) => (
                                        <li key={id}>
                                            <Link href={link} className="font-medium bg-base-200">
                                                <ChevronRight size={20} /> {title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </li>
                    ))}

                    <div className="divider"></div>

                    {Object.entries(menuItemsTwo).map(([itemTitle, { icon, ...items }]) => (
                        <li key={itemTitle}>
                            <details>
                                <summary className="font-semibold">
                                    {icon}
                                    {itemTitle}
                                </summary>
                                <ul className="menu gap-1 [&_li>*]:rounded-sm">
                                    {Object.entries(items).map(([id, { title, link }]) => (
                                        <li key={id}>
                                            <Link href={link} className="font-medium bg-base-200">
                                                <ChevronRight size={20} /> {title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </li>
                    ))}
                </ul>
            </div>

            {/* sidebar footer action menu sticky bottom */}
            <div className="p-1 sticky bottom-0 bg-base-200">
                <div className="grid grid-cols-3 gap-2">
                    <Link href="/settings" className="btn btn-ghost rounded-sm">
                        <Settings2 size={20} />
                    </Link>
                    <Link href="/support" className="btn btn-ghost rounded-sm">
                        <HelpCircle size={20} />
                    </Link>
                    <Link href="/logout" className="btn btn-ghost rounded-sm">
                        <LogOut size={20} />
                    </Link>
                </div>
            </div>
        </aside>
    );
}