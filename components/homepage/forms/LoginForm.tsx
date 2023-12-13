"use client";

import { Form } from "@/components/homepage/forms";
import { useLogin } from "@/hooks";

export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();

  const config = [
    {
      labelText: "Email",
      labelId: "email",
      type: "text",
      value: email,
      placeholder: "Email, ie: john.smith@example.com",
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "password",
      value: password,
      link: { linkText: "Forgot password?", linkUrl: "/auth/password-reset/" },
      placeholder: "Password",
      required: true,
    },
  ];

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Login"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
