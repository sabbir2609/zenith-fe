"use client"

import { useEffect, useState } from 'react';

export interface Topic {
    name: string;
}

export interface IoTProps {
    client_id: string;
    topic: Topic;
}

export default function IoTSocketData({ client_id, topic }: IoTProps) {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const wsUrl = `ws://127.0.0.1:8000/ws/device/${client_id}/`

        const socket = new WebSocket(wsUrl)

        socket.addEventListener('open', (event) => {
            console.log('WebSocket connection opened', event);
        });

        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log('IOT message received:', data.message);
            setMessage(data.message);
        });

        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed', event);
        });

        socket.addEventListener('error', (event) => {
            console.error('WebSocket error:', event);
        });

        return () => {
            socket.close();
        };

    }, [client_id, topic]);

    return (
        <div>
            <h1>IoT Data</h1>
            <p>Client ID: {client_id}</p>
            <p>
                {message}
            </p>
        </div>
    );
}