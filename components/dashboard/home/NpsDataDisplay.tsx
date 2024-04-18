"use client";

import { useState } from "react";
import NpsChart from "./charts/NpsGraph";

export default function NpsDataDisplay() {
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toLocaleString('default', { month: 'long' })
    );

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
    }

    return (
        <div className="flex flex-col flex-wrap p-2">
            <div className="flex flex-row justify-between items-center gap-2">
                <p className="flex-grow text-lg lg:text-xl font-bold">
                    Net Promoter Score
                </p>
                <MonthSelect selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
            </div>
            <NpsChart month={selectedMonth} />
        </div>
    )
}

const MonthSelect = ({ selectedMonth, onMonthChange }: { selectedMonth: string, onMonthChange: (Month: string) => void }) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onMonthChange(e.target.value);
    }

    return (
        <select className="select select-md rounded-sm" value={selectedMonth} onChange={handleChange}>
            {months.map(month => (
                <option key={month} value={month}>{month}</option>
            ))}
        </select>
    );
}