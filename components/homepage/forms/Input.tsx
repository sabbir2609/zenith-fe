"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";


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
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (

        <label htmlFor={labelId} className="form-control w-full">

            <div className="label">

                <span className="label-text">
                    {children}
                </span>

                {link && (
                    <div className="label-text-alt">
                        <Link href={link.linkUrl} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            {link.linkText}
                        </Link>
                    </div>
                )}

            </div>

            <div className="relative">
                <input
                    type={type === 'password' && !showPassword ? 'password' : 'text'}
                    id={labelId}
                    name={labelId}
                    placeholder={placeholder}
                    autoComplete={labelId}
                    className="input w-full input-bordered pr-10"
                    onChange={onChange}
                    value={value}
                    required={required}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-semibold text-gray-600 hover:text-gray-400 focus:outline-none"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>

        </label>
    );
}