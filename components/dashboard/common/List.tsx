import { Spinner } from "@/components/utils";


interface Config {
    label: string;
    value: string | undefined;
}

interface Props {
    config: Config[];
}

export default function List({ config }: Props) {
    return (
        <ul role='list' className='divide-y divide-gray-100'>
            {config.map(({ label, value }) => (
                <li key={label} className='flex justify-between gap-x-6 py-5'>
                    <div>
                        <p className='text-sm font-semibold leading-6'>
                            {label}
                        </p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold leading-6'>
                            {value || <Spinner sm />}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}