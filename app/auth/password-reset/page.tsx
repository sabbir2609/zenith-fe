import { PasswordResetForm } from "@/components/homepage/forms"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: "Zenith | Password Reset",
    description: "Request Password Reset Page",
}

export default function Page() {
    return (
        <div className="relative p-2 flex flex-col justify-center">
            <div className="w-full mt-4 p-6 m-auto  rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                <h2 className="text-3xl font-semibold text-center">
                    Reset Your Password
                </h2>

                <PasswordResetForm />
            </div>
        </div>
    )
}