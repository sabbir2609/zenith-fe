interface TextAreaProps {
    name: string;
    placeholder?: string;
    className?: string;
    maxLength?: number;
    rows?: number;
    label?: string;
}

export default function TextArea({ name, placeholder, className, maxLength, rows, label }: TextAreaProps) {
    return (
        <label className="form-control w-full">
            {label && (
                <div className="label">
                    <span className="label-text">{label}</span>
                </div>
            )}
            <textarea
                name={name}
                placeholder={placeholder}
                className={`textarea textarea-bordered w-full ${className}`}
                maxLength={maxLength}
                rows={rows}
            />
        </label>
    );
};