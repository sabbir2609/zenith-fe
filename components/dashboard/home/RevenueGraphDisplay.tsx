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
            <div className="flex justify-between flex-wrap items-center gap-2">
                <div className="flex flex-row p-2 items-center gap-2">
                    <p className="text-2xl font-bold">
                        Overall Revenue
                    </p>
                    <button className='btn btn-sm btn-square rounded-none'>
                        <ChevronRight className='text-secondary' />
                    </button>
                </div>
                <div className="flex p-2 gap-2">
                    <YearSelect selectedYear={selectedYear} onYearChange={handleYearChange} />
                </div>
            </div>
            <div className="h-[300px] pb-8">
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
        <select className="select select-base-300" value={selectedYear} onChange={handleChange}>
            {years.map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
        </select>
    );
}
