interface SelectProps {
    selectedOption: string;
    onOptionChange?: (option: string) => void; // Make this optional
    options: string[];
    style?: string;
}

export default function Select({ selectedOption, onOptionChange, options, style }: SelectProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onOptionChange) {
            onOptionChange(e.target.value);
        }
    }

    return (
        <select className={`select ${style}`} value={selectedOption} onChange={handleChange}>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
}