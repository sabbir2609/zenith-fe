interface SelectProps {
    name: string;
    options: { id: number, name: string }[];
    label?: string;
    className?: string;
    required?: boolean;
}

export default function FormSelect({ name, options, label, className, required = false }: SelectProps) {
    return (
        <label className={`form-control w-full ${className}`}>
            {label && (
                <div className="label">
                    <span className="label-text">{label}</span>
                </div>
            )}
            <select name={name} className="select select-bordered w-full" required={required}>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
        </label>
    );
};