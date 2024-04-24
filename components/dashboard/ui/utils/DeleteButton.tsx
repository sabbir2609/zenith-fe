"use client";

import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

const DeleteButton = (
    { Id }: { Id: number }
) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const deleteRoomType = async (id: number) => {
        if (!isClient) return;

        // Your delete logic here
    };

    return (
        <button className="btn btn-sm join-item" onClick={() => deleteRoomType(Id)}>
            <Trash size={18} />
        </button>
    );
};