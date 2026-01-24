"use client";

import ThemeChange from "@/components/common/theme-change";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../../ui/sidebar";
import Breadcrumb from "./breadcrumb";
import NavUser from "./nav-user";
import Notification from "./notification";

export default function Navbar() {

  return (
    <header className="flex h-14 shrink-0 items-center justify-between sticky top-0 z-10 bg-background border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        {/* breadcrumb */}
        <div className="hidden md:block">
          <Breadcrumb homeElement />
        </div>

      </div>

      {/* Navigation Menu */}

      {/* Right section - notifications, theme toggle, user profile */}
      <div className="flex items-center px-2 gap-2">
        {/* Theme Change */}
        <ThemeChange />

        {/* Notification Component */}
        <Notification />

        {/* User Profile */}
        <NavUser />

      </div>
    </header>
  );
}