"use client";

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { memo } from "react";

// Memoize the component to prevent unnecessary re-renders
export const NavUser = memo(function NavUser() {
  const { isMobile } = useSidebar();
  const { user, logout, loading } = useAuth({
    // Add SWR configuration to reduce revalidation
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 60000, // 1 minute
  });

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.first_name} />
                <AvatarFallback className="rounded-lg">U</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user.first_name} {user.last_name}
                </span>
                <span className="truncate text-xs">
                  {user?.email || "No email"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {/* Rest of your dropdown menu content remains the same */}
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* ... existing dropdown content ... */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.first_name} />
                  <AvatarFallback className="rounded-lg">U</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center"
                  passHref
                >
                  <BadgeCheck className="mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/notifications"
                  className="flex items-center"
                  passHref
                >
                  <Bell className="mr-2" />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                <LogOut className="mr-2" />
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});
