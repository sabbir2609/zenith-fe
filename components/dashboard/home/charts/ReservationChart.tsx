import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

// Generate monthly data with the first three letters of each month for the label
function generateMonthlyData() {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return months.map((month) => ({
        month,
        monthNumber: months.indexOf(month) + 1,
        reservations: Math.floor(Math.random() * 100 + 50), // Random reservations between 50 and 150
    }));
}

// Generate daily data for a given number of days
function generateDailyData(days: number) {
    const data = [];
    for (let i = 1; i <= days; i++) {
        data.push({
            day: `${i}`,
            reservations: Math.floor(Math.random() * 20 + 10), // Random reservations between 10 and 30
            checkout: Math.floor(Math.random() * 10 + 5), // Random checkouts between 5 and 15
        });
    }
    return data;
}

export default function ReservationChart({
    year,
    month,
}: {
    year: string;
    month: string;
}) {
    const [view, setView] = useState('Monthly'); // 'Monthly' or 'Yearly'

    const handleToggle = () => {
        setView((prev) => (prev === 'Monthly' ? 'Yearly' : 'Monthly'));
    };

    const monthlyData = generateMonthlyData();
    const dailyData = generateDailyData(31);

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">
                    Reservation Chart for {month} {year}
                </p>
                <div className="flex items-center">
                    <span className="label-text mr-2">Yearly</span>
                    <label className="switch">
                        <input type="checkbox" onChange={handleToggle} className='checkbox' />
                    </label>
                </div>
            </div>

            <div className="w-full">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={view === 'Yearly' ? monthlyData : dailyData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey={view === 'Yearly' ? 'monthNumber' : 'day'}
                            tick={{ fontSize: '0.75rem' }} // Adjust font size
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="reservations" stackId="a" fill="#8884d8" />
                        {view === 'Monthly' && <Bar dataKey="checkout" stackId="a" fill="#82ca9d" />}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
