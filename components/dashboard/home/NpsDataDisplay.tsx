"use client";

import { useState } from "react";
import NpsChart from "./charts/NpsGraph";
import { Select } from "../ui";

export default function NpsDataDisplay() {
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toLocaleString('default', { month: 'long' })
    );

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
    }

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

    return (
        <div className="flex flex-col flex-wrap p-2">
            <div className="flex flex-row justify-between items-center gap-2">
                <p className="flex-grow text-lg lg:text-xl font-bold">
                    Net Promoter Score
                </p>
                <Select options={months} selectedOption={selectedMonth} onOptionChange={handleMonthChange} />
            </div>
            <NpsChart month={selectedMonth} />
        </div>
    )
}