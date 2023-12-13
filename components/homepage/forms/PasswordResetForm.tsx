"use client"

import { Form } from '@/components/homepage/forms'
import { useResetPassword } from '@/hooks'

export default function PasswordResetForm() {
    const { email, isLoading, onChange, onSubmit } = useResetPassword();
    const config = [
        {
            labelText: 'Email Address',
            labelId: 'email',
            type: 'email',
            placeholder: 'ie: john.smith@example.com',
            value: email,
            required: true,
        }
    ]

    return (
        <Form
            config={config}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onChange={onChange}
            btnText='Request Password Reset'
        />
    )
}