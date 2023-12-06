import { ChangeEvent } from "react";

interface Props {
    labelId: string;
    type: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    children: React.ReactNode;
    required?: boolean;
}

export default function Input({
    labelId,
    type,
    placeholder,
    onChange,
    value,
    children,
    required = false
}: Props) {
    return (
        <div>
            <label htmlFor={labelId} className="label">
                <span className="text-base label-text">{children}</span>
            </label>
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
    );
}
