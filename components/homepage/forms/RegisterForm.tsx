"use client";

import { useRegister } from "@/hooks";
import { Form } from "@/components/homepage/forms";

export default function RegisterForm() {
    const {
        first_name,
        last_name,
        email,
        password,
        re_password,
        isLoading,
        onChange,
        onSubmit
    } = useRegister();

    const config = [
        {
            labelText: "First Name",
            labelId: "first_name",
            type: "text",
            value: first_name,
            placeholder: "ie: John",
            required: true
        },
        {
            labelText: "Last Name",
            labelId: "last_name",
            type: "text",
            value: last_name,
            placeholder: "ie: Smith",
            required: true
        },
        {
            labelText: "email",
            labelId: "email",
            type: "text",
            value: email,
            placeholder: "ie: john.smith@example.com",
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
