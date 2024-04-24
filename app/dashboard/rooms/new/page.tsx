"use client";

import { useState } from 'react';

interface Room {
    floor: number;
    room_label: string;
    room_type: string;
    capacity: number;
    description: string;
    is_available: boolean;
}

export default function AddRoomPage() {
    const [room, setRoom] = useState<Partial<Room>>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setRoom({
            ...room,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 p-2 w-full lg:w-1/2">
                <div>
                    <label htmlFor="floor" className="block text-sm font-medium text-gray-700">Floor</label>
                    <select id="floor" name="floor" onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="room_type" className="block text-sm font-medium text-gray-700">Room Type</label>
                    <select id="room_type" name="room_type" onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="suite">Suite</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="room_label" className="block text-sm font-medium text-gray-700">Room Label</label>
                    <input type="text" id="room_label" name="room_label" onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
                    <input type="number" id="capacity" name="capacity" onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
                <div>
                    <div className="flex items-center">
                        <input id="is_available" name="is_available" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label htmlFor="is_available" className="ml-2 block text-sm text-gray-900">Is Available</label>
                    </div>
                </div>
                <button type="submit" className="mt-3 btn btn-primary">Submit</button>
            </form>
        </div>
    );
}