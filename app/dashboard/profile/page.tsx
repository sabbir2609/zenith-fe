"use client"

import { useState, useEffect } from 'react';

interface User {
    first_name: string;
    last_name: string;
    email: string;
}

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/auth/users/me/', {
                    credentials: 'include',
                });

                if (response.ok) {
                    const userData: User = await response.json();
                    setUser(userData);
                } else {
                    const errorMessage = await response.text();
                    setError(errorMessage);
                }
            } catch (error: any) {
                console.error('Error fetching user data:', error.message);
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="m-2">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : user ? (
                <div className="p-8 rounded shadow-md">
                    <p className="text-lg font-semibold mb-4">User Information</p>
                    <p>
                        <span className="font-semibold">Name:</span>
                        {user.first_name} {user.last_name}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    {/* Add more user information fields as needed */}
                </div>
            ) : (
                <div className="max-h-screen flex flex-col gap-4 w-auto">
                    <div className="flex gap-4 items-center">
                        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                        <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div>
                    </div>
                    <div className="skeleton h-32 w-full"></div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
