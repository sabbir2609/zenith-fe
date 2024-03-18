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
                                <Link href="/dashboard/devices/type">
                                    Device Types
                                </Link>
                            </li>

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

            </ul>
        </aside >
    )
}