interface InputProps {
    name: string;
    type: string;
    placeholder?: string;
    className?: string;
    maxLength?: number;
    pattern?: string;
    title?: string;
    label?: string;
    required?: boolean;
}

export default function Input({ name, type, placeholder, className, maxLength, pattern, title, label, required = false }: InputProps) {
    return (
        <label className="form-control w-full">
            {label && (
                <div className="label">
                    <span className="label-text">{label}</span>
                </div>
            )}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                className={`input input-bordered w-full ${className}`}
                maxLength={maxLength}
                pattern={pattern}
                title={title}
                required={required}
            />
        </label>
    );
};