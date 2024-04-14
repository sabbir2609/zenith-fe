import { Lock, WashingMachine, Coffee, MoveLeft, MoveRight, SquareArrowUpRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function AlertDisplay() {
    const data = [
        {
            id: 1,
            icon: <WashingMachine className='text-secondary' />,
            task: 'Laundry',
            taskId: 31234,
            description: 'Request From Guest, room 101',
            status: 'in progress',
            assignee: 'John Doe'
        },
        {
            id: 2,
            icon: <Coffee className='text-secondary' />,
            task: 'Coffee',
            taskId: 31235,
            description: 'Request From Guest, room 102',
            status: 'in progress',
            assignee: 'Jane Doe'
        },
        {
            id: 3,
            icon: <Lock className='text-secondary' />,
            task: 'Locked Door',
            taskId: 31236,
            description: 'Request From Guest, room 103',
            status: 'in progress',
            assignee: 'John Doe'
        }
    ]
    return (
        <>
            <div className="flex justify-between flex-wrap items-center gap-2">
                <div className="flex flex-row p-2 items-center gap-2">
                    <p className="text-2xl font-bold">Room Alert</p>
                    <button className='btn btn-sm btn-ghost rounded-none'>
                        <SquareArrowUpRight className='text-secondary' />
                    </button>
                </div>
                <div className="flex p-2 gap-2">
                    <button className='btn btn-sm rounded-none btn-square'>
                        <MoveLeft className='text-secondary' />
                    </button>
                    <button className='btn btn-sm rounded-none btn-square'>
                        <MoveRight className='text-secondary' />
                    </button>
                </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-2">

                {data.map((item, index) => (
                    <div key={index} className="shadow-md rounded-md p-4 bg-accent">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <div>{item.icon}</div>
                                <div className="text-xl font-bold">{item.task}</div>
                            </div>

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-sm rounded-none shadow-none">
                                    Actions
                                    <ChevronDown className='text-secondary' />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-52">
                                    <li>
                                        <Link href={`/task/${item.id}`}>
                                            View
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/task/${item.id}`}>
                                            Edit
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/task/${item.id}`}>
                                            Delete
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div className="flex flex-row mb-2 items-center justify-between">
                            <div className="text-xl font-bold">#{item.taskId}</div>
                            <div className="text-sm">{item.description}</div>
                        </div>
                        <div className="flex flex-row mb-2 items-center justify-between">
                            <div className="text-sm">Status</div>
                            <div className="text-lg">{item.status}</div>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <div className="text-sm">Assignee</div>
                            <div className="text-lg">{item.assignee}</div>
                        </div>

                    </div>
                ))}

            </div>
        </>
    )
}