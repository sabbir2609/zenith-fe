"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { userIcon } from "@/public";
import Link from "next/link";

export function AuthSection() {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="flex items-center">
      {isAuthenticated ? (
        <DropdownMenu modal={true}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0">
              <Avatar>
                <AvatarImage src={userIcon.src} alt="User Profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>Welcome, {user?.first_name}</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/logout">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
