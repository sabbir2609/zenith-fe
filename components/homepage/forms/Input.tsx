import Link from "next/link";
import { ChangeEvent } from "react";

interface Props {
    labelId: string;
    type: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    children: React.ReactNode;
    link?: {
        linkText: string;
        linkUrl: string;
    }
    required?: boolean;
}

export default function Input({
    labelId,
    type,
    placeholder,
    onChange,
    value,
    children,
    link,
    required = false
}: Props) {
    return (
        <div>

            <div className="flex justify-between align-center">
                <label htmlFor={labelId} className="block text-sm font-medium leading-6">
                    {children}
                </label>

                {link && (
                    <div className="text-sm">
                        <Link className="font-semibold text-indigo-600 hover:text-indigo-500" href={link.linkUrl}>
                            {link.linkText}
                        </Link>
                    </div>
                )
                }
            </div>

            <div className="">
                <input
                    type={type}
                    id={labelId}
                    name={labelId}
                    placeholder={placeholder}
                    autoComplete={labelId}
                    className="input w-full input-bordered"
                    onChange={onChange}
                    value={value}
                    required={required}
                />
            </div>
        </div>
    );
}
