"use client";

import { useState } from "react";
import NpsChart from "./charts/NpsGraph";

export default function NpsDataDisplay() {
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
    const currentMonth = months[new Date().getMonth()];
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
    }

    return (
        <>
            <div className="flex flex-row gap-2">
                <div className="flex-grow p-2 items-center gap-2">
                    <p className="text-2xl font-bold">
                        Net Promoter Score
                    </p>
                </div>
                <div className="flex p-2 gap-2">
                    <MonthSelect selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 mb-2 rounded-sm shadow-md h-[300px]">
                <NpsChart month={selectedMonth} />
            </div>
        </>
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
        <select className="select select-md rounded-sm bg-base-300" value={selectedMonth} onChange={handleChange}>
            {months.map(month => (
                <option key={month} value={month}>{month}</option>
            ))}
        </select>
    );
}