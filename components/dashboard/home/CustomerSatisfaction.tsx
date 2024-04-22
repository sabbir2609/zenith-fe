"use client";

import { ArrowUp, Frown, Meh, Smile } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Select } from "../ui";

export default function CustomerSatisfaction() {
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
    const satisfactionRate = [
        {
            type: "Satisfied",
            rate: "80%",
            icon: <Smile size={20} />
        },
        {
            type: "Neutral",
            rate: "10%",
            icon: <Meh size={20} />
        },
        {
            type: "Dissatisfied",
            rate: "10%",
            icon: <Frown size={20} />
        }
    ]

    const percentage = 60;

    return (
        <div className="flex flex-col flex-wrap m-2">
            <div className="flex flex-row justify-between items-center gap-2">
                <p className="font-bold text-lg lg:text-xl">Customer Satisfaction</p>
                <div className="ml-">
                    <Select selectedOption={selectedMonth} onOptionChange={handleMonthChange} options={months} />
                </div>
            </div>

            <div className="flex flex-col mb-2">
                <p>
                    Overall Score for <b>{selectedMonth}</b>
                </p>
                <div className="flex flex-row items-baseline gap-2">
                    <p className="text-4xl font-bold">
                        {percentage}%
                    </p>
                    <div className="flex flex-wrap items-center">
                        <div className="flex flex-row items-center p-0 rounded-sm bg-base-200">
                            <ArrowUp size={16} /> +5%
                        </div>
                        <p className="text-sm font-serif font-semibold text-green-500 ml-2">
                            from last month
                        </p>
                    </div>
                </div>
            </div>
            <div className="m-2">
                <div
                    className="h-16 w-full bg-orange-200"
                    style={{
                        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(0, 0, 0, 0.1) 5px, rgba(0, 0, 0, 0.1) 10px)`
                    }}
                >
                    <div
                        className="h-16 bg-orange-500"
                        style={{
                            width: `${percentage}%`,
                            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(0, 0, 0, 0.1) 5px, rgba(0, 0, 0, 0.1) 10px)`
                        }}
                    >

                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between gap-2 p-2">
                {satisfactionRate.map((rate, index) => (
                    <div key={index} className="flex flex-col gap-3">
                        <div className="flex flex-row items-center gap-1">
                            {rate.icon}
                            <p className="text-sm font-normal">{rate.type}</p>
                        </div>
                        <p className="text-xl font-bold">{rate.rate}</p>
                    </div>
                ))}
            </div>
            <p className="text-justify font-medium">
                Your customer satisfaction are above +2% of your competitors.
                To see full report click on the button below.
            </p>
            <Link href={"#"} className="btn mt-2 rounded-sm text-base self-start">See Report</Link>
        </div>
    )
}