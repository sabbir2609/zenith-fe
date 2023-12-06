import { ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/homepage/forms";
import Spinner from "@/components/homepage/common/Spinner";

interface Config {
    labelText: string;
    labelId: string;
    type: string;
    value: string;
    placeholder: string;
    required?: boolean;
}

interface Props {
    config: Config[];
    isLoading: boolean;
    btnText: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
    config,
    isLoading,
    btnText,
    onChange,
    onSubmit
}: Props) {
    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            {config.map((input) => (
                <Input
                    key={input.labelId}
                    labelId={input.labelId}
                    placeholder={input.placeholder}
                    type={input.type}
                    onChange={onChange}
                    value={input.value}
                    required={input.required}
                >
                    {input.labelText}
                </Input>
            ))}

            <div>
                <button type="submit" className="btn btn-block font-semibold">
                    {isLoading ? <Spinner sm /> : `${btnText}`}
                </button>
            </div>
        </form>
    );
}
