"use client";

import { useState } from "react";
import { Bell, BellDot } from "lucide-react";
import Link from "next/navigation";

export default function Notification() {

    const [notifications, setNotifications] = useState<any>([
        {
            id: 1,
            title: "New Comment",
            description: "You have a new comment on your post.",
            date: "2 hours ago",
            read: false,
        },
        {
            id: 2,
            title: "New Subscriber",
            description: "You have a new subscriber.",
            date: "3 hours ago",
            read: true,
        },
        {
            id: 3,
            title: "New Follower",
            description: "You have a new follower.",
            date: "4 hours ago",
            read: true,
        },
        {
            id: 4,
            title: "New Comment",
            description: "You have a new comment on your post.",
            date: "5 hours ago",
            read: false,
        },
        {
            id: 5,
            title: "New Subscriber",
            description: "You have a new subscriber.",
            date: "6 hours ago",
            read: true,
        },
    ]);

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                {notifications.some((item: any) => !item.read) ?
                    <button className="btn btn-ghost btn-circle">
                        <BellDot />
                    </button> :
                    <button className="btn btn-ghost btn-circle">
                        <Bell />
                    </button>
                }
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] px-2 pt-2 shadow bg-base-100 rounded-md mt-4 w-80">
                {notifications.map((notification: any) => (
                    <li key={notification.id} className={
                        `p-2 ${notification.read ? "bg-base-300" : "bg-base-200"} rounded-md mb-2`
                    }>
                        <div className="card w-80 cursor-pointer">
                            <h3 className="font-semibold text-base-content-primary">{notification.title}</h3>
                            <p className="text-xs text-base-content-secondary">{notification.date}</p>
                            <p className="text-xs text-base-content-secondary">{notification.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}