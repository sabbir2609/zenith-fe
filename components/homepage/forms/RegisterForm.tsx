"use client";

import { useRegister } from "@/hooks";
import { Form } from "@/components/homepage/forms";

export default function RegisterForm() {
    const {
        username,
        email,
        password,
        re_password,
        isLoading,
        onChange,
        onSubmit
    } = useRegister();

    const config = [
        {
            labelText: "Username",
            labelId: "username",
            type: "text",
            value: username,
            placeholder: "Username, ie: john.smith",
            required: true
        },
        {
            labelText: "email",
            labelId: "email",
            type: "text",
            value: email,
            placeholder: "Email, ie: john.smith@example.com",
            required: true
        },
        {
            labelText: "Password",
            labelId: "password",
            type: "password",
            value: password,
            placeholder: "Password",
            required: true
        },
        {
            labelText: "Confirm Password",
            labelId: "re_password",
            type: "password",
            value: re_password,
            placeholder: "Confirm Password",
            required: true
        }
    ];

    return (
        <Form
            config={config}
            isLoading={isLoading}
            btnText="Sign Up"
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}
