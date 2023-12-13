"use client"

import { Form } from '@/components/homepage/forms'
import { useResetPasswordConfirm } from '@/hooks'

interface Props {
    uid: string;
    token: string;
}

export default function PasswordResetConfirmForm({ uid, token }: Props) {
    const { new_password, re_new_password, isLoading, onSubmit, onChange } = useResetPasswordConfirm(uid, token);

    const config = [
        {
            labelText: 'New Password',
            labelId: 'new_password',
            type: 'password',
            placeholder: '',
            value: new_password,
            required: true,
        },
        {
            labelText: 'Confirm Password',
            labelId: 're_new_password',
            type: 'password',
            placeholder: '',
            value: re_new_password,
            required: true,
        }
    ]

    return (
        <Form
            config={config}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onChange={onChange}
            btnText='Submit'
        />
    )
}
