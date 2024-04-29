import { Airplay, Bath, Building2, CalendarCheck2, ChevronRight, CircleCheckBig, Fence, HandPlatter, HelpCircle, LayoutDashboard, LogOut, NotebookPen, Search, Settings2, UserRoundCog, UsersRound, Warehouse, } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MenuItemProps {
    id: string;
    title: string;
    link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, title, link }) => (
    <li key={id}>
        <Link href={link} className="font-medium bg-base-200">
            <ChevronRight size={20} /> {title}
        </Link>
    </li>
);

interface MenuGroupProps {
    title: string;
    icon: JSX.Element;
    items: Record<string, { title: string; link: string; }>;
}

export default function Sidebar() {
    const menuItemsMain = [
        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            link: "/dashboard"
        },
        {
            title: "Reservations",
            icon: <CalendarCheck2 size={20} />,
            link: "/dashboard/reservations"
        }
    ]

    const menuItemsOne = {

        "Accounts": {
            "icon": <UsersRound size={20} className="inline-block" />,
            "users": {
                "title": "Users",
                "link": "/dashboard/users"
            },
            "guests": {
                "title": "Guests",
                "link": "/dashboard/users/guests"
            }
        },

        "Tasks": {
            "icon": <CircleCheckBig size={20} className="inline-block" />,
            "addTask": {
                "title": "New Task",
                "link": "/dashboard/tasks/new"
            },
            "allTasks": {
                "title": "All Tasks",
                "link": "/dashboard/tasks"
            }
        },

        "Devices": {
            "icon": <Airplay size={20} className="inline-block" />,
            "deviceTypes": {
                "title": "Device Types",
                "link": "/dashboard/devices/type"
            },
            "allDevices": {
                "title": "All Devices",
                "link": "/dashboard/devices"
            }
        },

        "Floors": {
            "icon": <Building2 size={20} className="inline-block" />,
            "addFloor": {
                "title": "New Floor",
                "link": "/dashboard/floors/new"
            },
            "allFloors": {
                "title": "All Floors",
                "link": "/dashboard/floors"
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
            },
        },

        "Facilities": {
            "icon": <Fence size={20} className="inline-block" />,
            "addFacility": {
                "title": "Add Facility ",
                "link": "/dashboard/facilities/new"
            },
            "allFacilities": {
                "title": "All Facilities",
                "link": "/dashboard/facilities"
            },
        },

        "Inventory": {
            "icon": <Warehouse size={20} className="inline-block" />,
            "addInventory": {
                "title": "Add Inventory",
                "link": "/dashboard/inventory/new"
            },
            "Inventory": {
                "title": "Inventory",
                "link": "/dashboard/inventory"
            }
        },

        "Staff Management": {
            "icon": <UserRoundCog size={20} className="inline-block" />,
            "addStaff": {
                "title": "Add Staff",
                "link": "/dashboard/staffs/new"
            },
            "allStaff": {
                "title": "All Staff",
                "link": "/dashboard/staffs"
            },
            "Roles": {
                "title": "Roles",
                "link": "/dashboard/staffs/roles"
            }
        },

        "Restaurant": {
            "icon": <HandPlatter size={20} className="inline-block" />,
            "reservation": {
                "title": "Reservations",
                "link": "/dashboard/restaurant/reservations"
            },
            "menu": {
                "title": "Menu",
                "link": "/dashboard/restaurant/menu"
            },
            "orders": {
                "title": "Orders",
                "link": "/dashboard/restaurant/orders"
            },
            "tables": {
                "title": "Tables",
                "link": "/dashboard/restaurant/tables"
            }
        }
    };

    const menuItemsTwo = {
        "Reports": {
            "icon": <NotebookPen size={20} className="inline-block" />,
            "dailyReport": {
                "title": "Daily Report",
                "link": "/dashboard/reports/daily"
            },
            "monthlyReport": {
                "title": "Monthly Report",
                "link": "/dashboard/reports/monthly"
            },
            "yearlyReport": {
                "title": "Yearly Report",
                "link": "/dashboard/reports/yearly"
            }
        }
    };

    return (
        <aside className="min-h-screen w-72 flex flex-col bg-base-300">
            <div className="flex-grow">
                <SidebarHeader />

                {/* Menu section */}
                <ul className="menu gap-2">

                    {/* Main menu items */}
                    {menuItemsMain.map(({ title, icon, link }) => (
                        <li key={title}>
                            <Link href={link} className="font-semibold">
                                {icon}
                                {title}
                            </Link>
                        </li>
                    ))}

                    {/* Menu items one */}
                    {Object.entries(menuItemsOne).map(([title, { icon, ...items }]) => (
                        <MenuGroup key={title} title={title} icon={icon} items={items} />
                    ))}

                    <div className="divider m-3 h-1"></div>

                    {Object.entries(menuItemsTwo).map(([title, { icon, ...items }]) => (
                        <MenuGroup key={title} title={title} icon={icon} items={items} />
                    ))}

                </ul>
            </div>

            <SidebarFooter />
        </aside>
    );
}

const SidebarHeader = () => {
    return (
        <>
            {/* Logo section */}
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
        </>
    )
}


const SidebarFooter = () => {
    return (
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
    );
}

const MenuGroup: React.FC<MenuGroupProps> = ({ title, icon, items }) => (
    <li key={title}>
        <details>
            <summary className="font-semibold">
                {icon}
                {title}
            </summary>
            <ul className="menu gap-1 [&_li>*]:rounded-sm">
                {Object.entries(items).map(([id, item]) => (
                    <MenuItem key={id} id={id} {...item} />
                ))}
            </ul>
        </details>
    </li>
);