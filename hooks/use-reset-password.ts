import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function useResetPassword() {
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [email, setEmail] = useState("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        resetPassword(email)
            .unwrap()
            .then(() => {
                toast.success("Reset password link Sent to your email, Please check your email.");
            })
            .catch(() => {
                toast.error("Failed to send request! enter a valid mail.");
            });
    };

    return {
        email,
        isLoading,
        onChange,
        onSubmit,
    };
}