import { ArrowUp } from 'lucide-react';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ErrorBar, Legend } from 'recharts';

const NpsChart = ({ month }: { month: string }) => {

    const chartData = [
        { name: 'Promoters', value: 70 },
        { name: 'Passives', value: 20 },
        { name: 'Detractors', value: 10 },
    ];

    return (
        <>
            <div className='flex flex-col lg:flex-row p-2'>

                <div className='lg:flex-grow'>
                    <div>NPS Score</div>
                    <div className='flex flex-row items-center gap-3'>
                        <h1 className='text-4xl font-bold'>80%</h1>
                        <div className='flex flex-row items-center  text-sm text-gray-400'>
                            <ArrowUp />
                            <span>+10%</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-3">
                    <div>
                        <div className='flex items-center p-1 gap-2'>
                            <svg width="10" height="10" viewBox="0 0 10 10">
                                <rect width="10" height="10" fill="red" />
                            </svg>
                            {chartData[0].name}
                        </div>
                        <div className='text-xl font-semibold ms-5'>
                            {chartData[0].value}%
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center p-1 gap-2'>
                            <svg width="10" height="10" viewBox="0 0 10 10">
                                <rect width="10" height="10" fill="green" />
                            </svg>
                            {chartData[1].name}
                        </div>
                        <div className='text-xl font-semibold ms-5'>
                            {chartData[1].value}%
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center p-1 gap-2'>
                            <svg width="10" height="10" viewBox="0 0 10 10">
                                <rect width="10" height="10" fill="yellow" />
                            </svg>
                            {chartData[2].name}
                        </div>
                        <div className='text-xl font-semibold ms-5'>
                            {chartData[2].value}%
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};

export default NpsChart;
