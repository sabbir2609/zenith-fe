import { PasswordResetConfirmForm } from "@/components/homepage/forms"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: "Zenith | Password Reset Confirm",
    description: "Password Reset Confirm Page",
}

interface Props {
    params: { uid: string, token: string }
}

export default function Page({ params: { uid, token } }: Props) {
    return (
        <div className="relative p-2 flex flex-col justify-center">
            <div className="w-full mt-4 p-6 m-auto  rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                <h2 className="text-3xl font-semibold text-center">
                    Set New Password
                </h2>
                <PasswordResetConfirmForm uid={uid} token={token} />
            </div>
        </div>
    )
}