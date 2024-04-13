import { person1, person2, person3, person4 } from "@/public/static";
import Image from "next/image";


export default function ActivePersonCard() {

    const employees = [{
        id: 1,
        name: 'John Doe',
        avatar: person1
    },
    {
        id: 2,
        name: 'Jane Doe',
        avatar: person2
    },
    {
        id: 3,
        name: 'John Doe',
        avatar: person3
    },
    {
        id: 4,
        name: 'John Doe',
        avatar: person4
    },
    ];

    const totalEmployees = 56;

    return (
        <div className="flex flex-col justify-end p-2">

            <div className="avatar-group -space-x-6 rtl:space-x-reverse h-12">
                {employees.map((employee) => {
                    return (
                        <div key={employee.id} className="avatar">
                            <div className="w-12">
                                <Image src={employee.avatar} alt={employee.name} />
                            </div>
                        </div>
                    );
                })}
                <div className="avatar placeholder">
                    <div className="w-12 bg-neutral text-neutral-content">
                        <span>
                            +{totalEmployees}
                        </span>
                    </div>
                </div>
            </div>

            <div className="font-mono font-normal">
                {totalEmployees} employees working Today
            </div>

        </div>
    );
}