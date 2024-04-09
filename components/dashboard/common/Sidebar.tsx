import { Airplay, Bath, CalendarCheck2, HelpCircle, LayoutDashboard, LogOut, Search, Settings2, } from "lucide-react";
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
        <aside className="bg-base-300 min-h-screen w-72 flex flex-col">

            <div className="flex-grow">
                <div className='bg-base-200 sticky top-0 z-20 hidden items-center gap-2 px-4 py-2 backdrop-blur lg:flex shadow-sm'>
                    <Link href="/" className='flex-0 btn btn-ghost px-2'>
                        <div className='font-title text-primary inline-flex text-lg transition-all duration-200 md:text-2xl'>
                            <span className='text-justify font-normal text-2xl'>Zenith Admin</span>
                        </div>
                    </Link>
                </div>

                {/* Search section */}
                <div className="bg-base-200 sticky top-0 z-20 lg:hidden items-center bg-opacity-90 py-2 backdrop-blur shadow-sm">
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
                                <ul className="menu ms-8 gap-1">
                                    {Object.entries(items).map(([id, { title, link }]) => (
                                        <li key={id} className="font-medium font-sans">
                                            <Link href={link}>
                                                {title}
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
                                <ul className="menu ms-8 gap-1">
                                    {Object.entries(items).map(([id, { title, link }]) => (
                                        <li key={id} className="font-semibold font-sans">
                                            <Link href={link}>
                                                {title}
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
            <div className="z-20 bg-base-200 shadow-sm sticky bottom-0">
                <div className="grid grid-cols-3">

                    <Link href="/settings" className="btn btn-ghost m-2">
                        <Settings2 size={20} />
                    </Link>

                    <Link href="/support" className="btn btn-ghost m-2">
                        <HelpCircle size={20} />
                    </Link>

                    <Link href="/logout" className="btn btn-ghost m-2">
                        <LogOut size={20} />
                    </Link>

                </div>
            </div>
        </aside>
    );
}