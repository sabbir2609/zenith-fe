interface SelectProps {
    selectedOption: string;
    onOptionChange: (option: string) => void;
    options: string[];
}

export default function ({ selectedOption, onOptionChange, options }: SelectProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onOptionChange(e.target.value);
    }

    return (
        <select className="select select-md rounded-sm" value={selectedOption} onChange={handleChange}>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
}