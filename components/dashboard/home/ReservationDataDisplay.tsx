"use client";

import React, { useState } from "react";
import ReservationChart from "./charts/ReservationChart";
import { Select } from "../ui";

export default function ReservationDataDisplay() {
    const [selectedYear, setSelectedYear] = useState(
        new Date().getFullYear().toString()
    );

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
    }

    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toLocaleString('default', { month: 'long' })
    );

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
    }
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = [
        "2021", "2022", "2023", "2024", "2025", "Yearly"
    ];

    return (
        <div className="flex flex-col flex-wrap p-2">
            <div className="flex flex-row justify-between items-center gap-2">
                <p className="flex-grow text-lg lg:text-xl font-bold">
                    Reservation Data
                </p>
                <Select selectedOption={selectedMonth} onOptionChange={handleMonthChange} options={months} />
                <Select selectedOption={selectedYear} onOptionChange={handleYearChange} options={years} />
            </div>
            <div className="rounded-sm">
                <ReservationChart year={selectedYear} month={selectedMonth} />
            </div>
        </div>
    )
}