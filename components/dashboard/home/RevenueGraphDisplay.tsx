"use client";

import { ChevronRight } from "lucide-react";
import RevenueGraph from "./charts/RevenueGraph";
import React, { useState } from 'react';

export default function RevenueGraphDisplay() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const handleYearChange = (year: number) => {
        setSelectedYear(year);
    }

    return (
        <>
            <div className="flex flex-row justify-between items-center gap-2 m-2">
                <div className="flex flex-row items-center gap-2">
                    <p className="text-lg lg:text-xl font-bold">
                        Overall Revenue
                    </p>
                    <button className='btn btn-sm btn-square rounded-none'>
                        <ChevronRight className='' />
                    </button>
                </div>
                <div className="flex gap-2">
                    <YearSelect selectedYear={selectedYear} onYearChange={handleYearChange} />
                </div>
            </div>

            <div className="h-[300px] pb-12 rounded-b-sm">
                <RevenueGraph year={selectedYear} />
            </div>
        </>
    )
}

const YearSelect = ({ selectedYear, onYearChange }: { selectedYear: number, onYearChange: (year: number) => void }) => {
    const years = [2017, 2018, 2020, 2021, 2022, 2023, 2024];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onYearChange(parseInt(e.target.value));
    }

    return (
        <select className="select select-md rounded-sm" value={selectedYear} onChange={handleChange}>
            {years.map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
        </select>
    );
}