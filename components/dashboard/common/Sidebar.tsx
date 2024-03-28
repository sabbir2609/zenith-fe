import Link from "next/link";
import React from "react";
import { FcElectricalSensor, FcOpenedFolder, FcGenealogy, FcEngineering, FcMultipleDevices, FcHome } from "react-icons/fc";
import { IoSearchSharp } from "react-icons/io5";

const menuItemsOne = {
    "Devices": {
        "icon": "FcMultipleDevices",
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
        "icon": "FcHome",
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
        "icon": "FcHome",
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

const icons = {
    "FcGenealogy": FcGenealogy,
    "FcElectricalSensor": FcElectricalSensor,
    "FcOpenedFolder": FcOpenedFolder,
    "FcEngineering": FcEngineering, // This is the icon for the Dashboard
    "FcMultipleDevices": FcMultipleDevices, // This is the icon for the Devices
    "FcHome": FcHome // This is the icon for the Rooms

};

export default function Sidebar() {
    return (
        <aside className="bg-base-100 min-h-screen w-72">
            {/* Logo section */}
            <div className='bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex shadow-sm'>
                <Link href="/" className='flex-0 btn btn-ghost px-2'>
                    <div className='font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl'>
                        <span className='text-base-content uppercase'>Zenith</span>
                    </div>
                </Link>
            </div>

            {/* Search section */}
            <div className="bg-base-100 sticky top-0 z-20 lg:hidden items-center gap-2 bg-opacity-90 py-2 backdrop-blur shadow-sm">

                <form role="search" className="relative m-4 lg:hidden">
                    <div className="form-control">
                        <input type="search" name="q" className="input input-bordered" />
                    </div>
                    <button className="btn rounded-l-none absolute right-0 top-0">
                        <IoSearchSharp size={24} />
                    </button>
                </form>
            </div>
            {/* Menu section */}
            <ul className="menu px-4 py-0">

                <li>
                    <Link href="/dashboard" className="m-2 font-semibold">
                        <FcEngineering className="inline-block" size={20} />
                        Dashboard
                    </Link>
                </li>

                {Object.entries(menuItemsOne).map(([itemTitle, { icon, ...items }]) => (
                    <li key={itemTitle}>
                        <details>
                            <summary className="m-2 font-semibold">
                                {React.createElement(icons[icon as keyof typeof icons], { className: "inline-block", size: 20 })}
                                {itemTitle}
                            </summary>
                            <ul className="menu">
                                {Object.entries(items).map(([id, { title, link }]) => (
                                    <li key={id} className="m-2 font-semibold">
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
                            <summary className="m-2 font-semibold">
                                {React.createElement(icons[icon as keyof typeof icons], { className: "inline-block", size: 20 })}
                                {itemTitle}
                            </summary>
                            <ul className="menu">
                                {Object.entries(items).map(([id, { title, link }]) => (
                                    <li key={id} className="m-2 font-semibold">
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
        </aside>
    );
}