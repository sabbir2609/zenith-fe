import Link from "next/link";
import { Metadata } from "next";
import { LoginForm } from "@/components/homepage/forms";

export const metadata: Metadata = {
  title: "Zenith | Login",
  description: "Zenith System Login Page.",
};

export default function Page() {
  return (
    <div className="relative p-2 flex flex-col justify-center">
      <div className="w-full mt-4 p-6 m-auto  rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
        <h2 className="text-3xl font-semibold text-center">
          Sign into your account
        </h2>

        <LoginForm />

        <div className="pt-2">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className=" text-blue-600 hover:text-blue-800 hover:underline font-semibold"
          >
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
