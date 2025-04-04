'use client';

import React from "react";
import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
                        <Badge variant="default" className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs p-0">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80">
                <div className="p-2 space-y-1">
                    <div className="flex items-center justify-between p-3 border-b">
                        <h3 className="font-medium text-sm">Notifications</h3>
                        {unreadCount > 0 && (
                            <Button variant="ghost" size="sm" className="text-xs h-auto py-1">
                                Mark all as read
                            </Button>
                        )}
                    </div>

                    <div className="max-h-[300px] overflow-y-auto py-1">
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`flex items-start gap-3 p-3 my-1 hover:bg-muted/50 rounded-md cursor-pointer transition-colors ${!notification.read ? 'bg-muted/30' : ''}`}
                                >
                                    <div className="mt-1 flex-shrink-0">
                                        {!notification.read && (
                                            <Badge variant="default" className="w-2 h-2 p-0 rounded-full" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm">{notification.title}</h4>
                                        <p className="text-xs text-foreground/60 mt-0.5">{notification.description}</p>
                                        <span className="text-xs text-foreground/40 mt-1 block">5 mins ago</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-6 text-center text-foreground/60">
                                <p className="text-sm">No notifications</p>
                            </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="pt-2 border-t text-center">
                            <Link href='/dashboard/notifications' className="text-xs w-full">
                                View all notifications
                            </Link>
                        </div>
                    )}
                </div>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}