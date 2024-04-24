import { ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/homepage/forms";
import { Spinner } from "@/components/utils";
import Link from "next/link";

interface Config {
	labelText: string;
	labelId: string;
	type: string;
	value: string;
	link?: {
		linkText: string;
		linkUrl: string;
	}
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
	onSubmit,
}: Props) {
	return (
		<form className="space-y-2" onSubmit={onSubmit}>

			{config.map((input) => (
				<Input
					key={input.labelId}
					labelId={input.labelId}
					placeholder={input.placeholder}
					type={input.type}
					onChange={onChange}
					value={input.value}
					link={input.link}
					required={input.required}
				>
					{input.labelText}
				</Input>

			))}

			<div className="flex flex-row justify-between">
				<button
					type="submit"
					className="btn w-1/2 font-semibold"
					disabled={isLoading}
				>
					{isLoading ? <Spinner sm /> : `${btnText}`}
				</button>
				<Link href="/" className="btn font-semibold">
					Cancel
				</Link>
			</div>

		</form>
	);
}
