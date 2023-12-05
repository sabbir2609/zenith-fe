"use client";

import { useRegisterMutation } from "@/redux/features/authApiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import Spinner from "@/components/homepage/common/Spinner";

export default function Page() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { username, email, password, re_password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register({ username, email, password, re_password })
      .unwrap()
      .then(() => {
        toast.success("Please Check Email to Verify!");
        router.push("/auth/login");
      })
      .catch(() => {
        toast.error("Failed to Register Account!");
      });
  };

  return (
    <div className="relative p-2 flex flex-col justify-center">
      <div className="w-full mt-4 p-6 m-auto  rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center">Register</h1>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="username" className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              autoComplete="username"
              className="input w-full input-bordered"
              onChange={onChange}
              value={username}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="Email Address"
              className="input w-full input-bordered"
              onChange={onChange}
              value={email}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Enter Password"
              className="input w-full input-bordered"
              onChange={onChange}
              value={password}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="re_password"
              autoComplete="confirm-new-password"
              placeholder="Confirm Password"
              className="input w-full input-bordered"
              onChange={onChange}
              value={re_password}
              required
            />
          </div>

          <div>
            <button type="submit" className="btn btn-block font-semibold">
              {isLoading ? <Spinner sm /> : "Sign Up"}
            </button>
          </div>

          <div className="pt-2">
            Already have an account? <span></span>
            <Link
              href="/auth/login"
              className=" text-blue-600 hover:text-blue-800 hover:underline font-semibold"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
