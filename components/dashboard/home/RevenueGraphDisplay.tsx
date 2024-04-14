"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import RevenueGraph from "./charts/RevenueGraph";
import { SetStateAction, useState } from "react";

export default function RevenueGraphDisplay() {
    const years = [
        {
            id: 1,
            year: 2021
        },
        {
            id: 2,
            year: 2020
        },
        {
            id: 3,
            year: 2019
        },
        {
            id: 4,
            year: 2018
        },
        {
            id: 5,
            year: 2017
        }
    ]

    const [selectedYear, setSelectedYear] = useState(years[0].year);

    const handleSelectChange = (yearId: SetStateAction<number>) => {
        setSelectedYear(yearId);
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
                    <select className="select">
                        <option>
                            Year
                            <ChevronDown className='text-secondary' />
                        </option>
                        {years.map((year, id) => (
                            <option key={id} onClick={() => handleSelectChange(year.year)}>
                                {year.year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="h-[300px] mb-4 mt-2">
                <RevenueGraph year={selectedYear} />
            </div>
        </>
    )
}