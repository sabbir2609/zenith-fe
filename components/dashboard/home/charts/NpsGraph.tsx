import { ArrowUp } from 'lucide-react';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ErrorBar, Legend } from 'recharts';

const NpsChart = ({ month }: { month: string }) => {

    const chartData = [
        { name: 'Promoters', value: 70 },
        { name: 'Passives', value: 20 },
        { name: 'Detractors', value: 10 },
    ];

    const data = [
        {
            name: 'Score',
            promoters: chartData[0].value,
            passives: chartData[1].value,
            detractors: chartData[2].value
        }
    ];

    return (
        <>
            <div className='flex flex-col lg:flex-row'>

                <div className='lg:flex-grow'>
                    <p>NPS Score for <b>{month}</b></p>
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
                            <div className="badge badge-primary badge-xs rounded-none"
                                style={{ backgroundColor: '#00A878' }}
                            ></div>
                            {chartData[0].name}
                        </div>
                        <div className='text-xl font-semibold ms-5'>
                            {chartData[0].value}%
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center p-1 gap-2'>
                            <div className="badge badge-xs rounded-none"
                                style={{ backgroundColor: '#FCBF49' }}
                            ></div>
                            {chartData[1].name}
                        </div>
                        <div className='text-xl font-semibold ms-5'>
                            {chartData[1].value}%
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center p-1 gap-2'>
                            <div className="badge badge-success badge-xs rounded-none"
                                style={{ backgroundColor: '#C0C0C0' }}
                            ></div>
                            {chartData[2].name}
                        </div>
                        <div className='text-xl font-semibold ms-5'>
                            {chartData[2].value}%
                        </div>
                    </div>
                </div>

            </div>
            <div className="h-32">
                <ResponsiveContainer width="100%" height="70%">
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <Tooltip />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Bar dataKey="promoters" stackId="a" fill="#00A878" />
                        <Bar dataKey="passives" stackId="a" fill="#FCBF49" />
                        <Bar dataKey="detractors" stackId="a" fill="#C0C0C0" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
};

export default NpsChart;
