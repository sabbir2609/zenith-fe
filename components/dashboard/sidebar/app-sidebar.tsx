"use client";

import * as React from "react";
import {
  LayoutDashboard,
  CalendarCheck2,
  UsersRound,
  CircleCheckBig,
  Airplay,
  Building2,
  Bath,
  Fence,
  Warehouse,
  UserRoundCog,
  HandPlatter,
  NotebookPen,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Mountain,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
// import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import Link from "next/link";

const navData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avater.jpg",
  },

  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Reservations",
      url: "/dashboard/reservations",
      icon: CalendarCheck2,
    },
    {
      title: "Accounts",
      url: "#",
      icon: UsersRound,
      items: [
        {
          title: "Users",
          url: "/dashboard/users",
        },
        {
          title: "Guests",
          url: "/dashboard/users/guests",
        },
      ],
    },
    {
      title: "Floors",
      url: "#",
      icon: Building2,
      items: [
        {
          title: "Floor List",
          url: "/dashboard/floors",
        },
      ],
    },
    {
      title: "Rooms",
      url: "#",
      icon: Bath,
      items: [
        {
          title: "Room Types",
          url: "/dashboard/rooms/room-types",
        },
        {
          title: "All Rooms",
          url: "/dashboard/rooms",
        },
      ],
    },
    {
      title: "Facilities",
      url: "#",
      icon: Fence,
      items: [
        {
          title: "Add Facility",
          url: "/dashboard/facilities/new",
        },
        {
          title: "All Facilities",
          url: "/dashboard/facilities",
        },
      ],
    },
    {
      title: "Inventory",
      url: "#",
      icon: Warehouse,
      items: [
        {
          title: "Add Inventory",
          url: "/dashboard/inventory/new",
        },
        {
          title: "Inventory",
          url: "/dashboard/inventory",
        },
      ],
    },
    {
      title: "Staff Management",
      url: "#",
      icon: UserRoundCog,
      items: [
        {
          title: "Add Staff",
          url: "/dashboard/staffs/new",
        },
        {
          title: "All Staff",
          url: "/dashboard/staffs",
        },
        {
          title: "Roles",
          url: "/dashboard/staffs/roles",
        },
      ],
    },
    {
      title: "Tasks",
      url: "#",
      icon: CircleCheckBig,
      items: [
        {
          title: "New Task",
          url: "/dashboard/tasks/new",
        },
        {
          title: "All Tasks",
          url: "/dashboard/tasks",
        },
      ],
    },
    {
      title: "Devices",
      url: "#",
      icon: Airplay,
      items: [
        {
          title: "Device Types",
          url: "/dashboard/devices/type",
        },
        {
          title: "All Devices",
          url: "/dashboard/devices",
        },
      ],
    },
    {
      title: "Restaurant",
      url: "#",
      icon: HandPlatter,
      items: [
        {
          title: "Reservations",
          url: "/dashboard/restaurant/reservations",
        },
        {
          title: "Menu",
          url: "/dashboard/restaurant/menu",
        },
        {
          title: "Orders",
          url: "/dashboard/restaurant/orders",
        },
        {
          title: "Tables",
          url: "/dashboard/restaurant/tables",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: NotebookPen,
      items: [
        {
          title: "Daily Report",
          url: "/dashboard/reports/daily",
        },
        {
          title: "Monthly Report",
          url: "/dashboard/reports/monthly",
        },
        {
          title: "Yearly Report",
          url: "/dashboard/reports/yearly",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/homepage" className="text-lg font-bold">
          <SidebarMenuButton tooltip={"Back to Home"}>
            <Mountain />
            Zenith Systems
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
