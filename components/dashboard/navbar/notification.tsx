'use client';

import React from "react";
import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Notification() {
    const notifications = [
        { id: 1, title: "New message", description: "You have a new message", read: false },
        { id: 2, title: "Task completed", description: "Project task completed", read: false },
        { id: 3, title: "Meeting reminder", description: "Team meeting in 30 minutes", read: true },
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger aria-label="notification" asChild>
                <Button
                    className="flex items-center gap-2 relative"
                    variant="outline"
                    aria-label="Notifications"
                >
                    <Bell size={24} />
                    {unreadCount > 0 && (
                        <Badge variant="default" className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80">
                <div className="p-4 space-y-4">
                    {notifications.map(notification => (
                        <div key={notification.id} className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold">{notification.title}</h4>
                                <p className="text-sm text-foreground/60">{notification.description}</p>
                            </div>
                            {!notification.read && (
                                <Badge variant="default" className="w-2 h-2" />
                            )}
                        </div>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}