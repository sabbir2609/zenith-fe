"use client"

import Theme from "./Theme";
import Image from "next/image";
import userIcon from "./../../../static/image/user_icon.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";

export default function Navbar() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        router.push("/");
      })

  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <label
          htmlFor="my-drawer"
          className="btn btn-square btn-ghost drawer-button lg:hidden "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <Link href='/dashboard' className="btn btn-ghost text-xl">Zenith</Link>
      </div>

      <div className="flex-none gap-2">
        <div className="form-control hidden lg:block">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>

        <div title="theme-change" className="dropdown dropdown-end ">
          <div tabIndex={0} className="btn gap-1 normal-case btn-ghost">
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              ></path>
            </svg>
            <span className="hidden md:inline">Theme</span>
            <svg
              width="12px"
              height="12px"
              className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <Theme Component={undefined} pageProps={undefined} />
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="User Profile Pic"
                width={200}
                height={200}
                src={userIcon}
              />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link href="/dashboard/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <span role="button" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
