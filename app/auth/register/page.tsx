import Link from "next/link";
import { RegisterForm } from "@/components/homepage/forms";

export default function Page() {
    return (
        <div className="relative p-2 flex flex-col justify-center">
            <div className="w-full mt-4 p-6 m-auto  rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center">Register</h1>

                <RegisterForm />

                <div className="pt-2">
                    Already have an account? <span></span>
                    <Link
                        href="/auth/login"
                        className=" text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
