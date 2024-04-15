"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';
import { ArrowUp } from 'lucide-react';

interface Data {
    name: string;
    earnings: number;
}


export default function RevenueGraph({ year }: { year: number }) {
    const data: Data[] = [
        {
            name: 'Jan',
            earnings: 6000,
        },
        {
            name: 'Feb',
            earnings: 5500,
        },
        {
            name: 'Mar',
            earnings: 3000,
        },
        {
            name: 'Apr',
            earnings: 3500,
        },
        {
            name: 'May',
            earnings: 2500,
        },
        {
            name: 'Jun',
            earnings: 3000,
        },
        {
            name: 'Jul',
            earnings: 4500,
        },
        {
            name: 'Aug',
            earnings: 4000,
        },
        {
            name: 'Sep',
            earnings: 3500,
        },
        {
            name: 'Oct',
            earnings: 4000,
        },
        {
            name: 'Nov',
            earnings: 7500,
        },
        {
            name: 'Dec',
            earnings: 9000,
        },
    ];

    const cardinal = curveCardinal.tension(0.2);

    return (
        <>  <div className="flex flex-wrap justify-between">
            <p className='text-xl font-semibold ms-14'>
                Total: ${data.reduce((acc, curr) => acc + curr.earnings, 0) / 1000}k
            </p>
            <p className='flex text-xl font-medium italic me-8 items-center'>
                <span className='flex bg-secondary p-1 rounded-sm items-center'><ArrowUp className='inline' />5.3%</span> Vs Last Year
            </p>
        </div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis dataKey="earnings" tickFormatter={(tick) => `$${tick / 1000}k`} />
                    <Tooltip />
                    <Area type={cardinal} dataKey="earnings" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
            </ResponsiveContainer>

        </>
    );
}