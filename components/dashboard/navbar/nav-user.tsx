import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function NavUser() {
    const { user, loading } = useAuth()

    if (loading) return (
        <Button variant="ghost" className="flex items-center gap-2" disabled>
            <Loader size={24} className="animate-spin" />
            <span>Loading...</span>
        </Button>
    )

    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button
                    className="flex items-center gap-2"
                    variant="outline"
                    aria-label="User menu"
                >
                    <Avatar className="w-8 h-8" >
                        <AvatarImage src={user?.avatar || "/avatar.jpg"} alt="User avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span>{user?.first_name}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/auth/logout">Logout</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}