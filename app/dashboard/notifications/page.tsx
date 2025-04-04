'use client';

import { useState } from 'react';
import { Bell, CheckCheck, Filter, Search, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define types - these will guide your API design
interface Notification {
    id: number;
    title: string;
    description: string;
    read: boolean;
    type: 'message' | 'task' | 'reminder' | 'system';
    time: string;
}

type FilterType = 'all' | 'unread' | 'read';

export default function NotificationsPage() {
    // Dummy data - this represents what you'd fetch from your API
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, title: "New message", description: "You have a new message from Alex regarding the project proposal.", read: false, type: "message", time: "5 mins ago" },
        { id: 2, title: "Task completed", description: "Project task 'Design homepage mockup' has been marked as complete.", read: false, type: "task", time: "2 hours ago" },
        { id: 3, title: "Meeting reminder", description: "Team meeting in 30 minutes. Don't forget to prepare your updates.", read: true, type: "reminder", time: "Yesterday" },
        { id: 4, title: "System update", description: "The system will undergo maintenance this weekend. Please save your work.", read: true, type: "system", time: "2 days ago" },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('all');

    const unreadCount = notifications.filter(n => !n.read).length;

    // Filter notifications based on search query and filter type
    const filteredNotifications = notifications.filter(notification => {
        const matchesSearch = searchQuery === '' ||
            notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterType === 'all' ||
            (filterType === 'read' && notification.read) ||
            (filterType === 'unread' && !notification.read);

        return matchesSearch && matchesFilter;
    });

    // Mark all as read
    const markAllAsRead = () => {
        // In a real API, you would call:
        // await fetch('/api/notifications/mark-all-read', { method: 'PUT' })

        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    // Mark single notification as read
    const markAsRead = (id: number) => {
        // In a real API, you would call:
        // await fetch(`/api/notifications/${id}/read`, { method: 'PUT' })

        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    // Clear all notifications
    const clearAll = () => {
        // In a real API, you would call:
        // await fetch('/api/notifications', { method: 'DELETE' })

        setNotifications([]);
    };

    return (
        <div className="container mx-auto py-8 px-4 md:px-6 max-w-4xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Notifications</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your notifications and preferences
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                    {unreadCount > 0 && (
                        <Button variant="outline" size="sm" onClick={markAllAsRead}>
                            <CheckCheck className="mr-2 h-4 w-4" />
                            Mark all as read
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={clearAll}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear all
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
                <div className="p-4 border-b">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search notifications..."
                                    className="pl-8"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Select
                                defaultValue="all"
                                onValueChange={(value) => setFilterType(value as FilterType)}
                            >
                                <SelectTrigger className="w-[160px]">
                                    <Filter className="mr-2 h-4 w-4" />
                                    <SelectValue placeholder="Filter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="unread">Unread</SelectItem>
                                    <SelectItem value="read">Read</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <div className="px-4 pt-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="unread">
                                Unread
                                {unreadCount > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                        {unreadCount}
                                    </Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="read">Read</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="all" className="mt-0">
                        {renderNotificationsList(filteredNotifications, markAsRead)}
                    </TabsContent>

                    <TabsContent value="unread" className="mt-0">
                        {renderNotificationsList(filteredNotifications.filter(n => !n.read), markAsRead)}
                    </TabsContent>

                    <TabsContent value="read" className="mt-0">
                        {renderNotificationsList(filteredNotifications.filter(n => n.read), markAsRead)}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function renderNotificationsList(notifications: Notification[], markAsRead: (id: number) => void) {
    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-muted/30 p-4 rounded-full">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                <p className="mt-2 text-muted-foreground text-center max-w-sm">
                    When you receive notifications, they&apos;ll appear here
                </p>
            </div>
        );
    }

    return (
        <div className="divide-y">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${!notification.read ? 'bg-muted/20' : ''
                        }`}
                    onClick={() => markAsRead(notification.id)}
                >
                    <div className="flex gap-4">
                        <div className="mt-1">
                            {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h3 className="font-medium">{notification.title}</h3>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                            <div className="mt-2">
                                <Badge variant="outline" className="text-xs">{notification.type}</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}