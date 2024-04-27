"use client"

import Theme from "./Theme";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";
import { userIcon } from "@/public/static";
import Notification from "./Notification";

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
    <div className="navbar z-40">

      <div className="flex-none lg:hidden">

        <label
          htmlFor="my-drawer"
          className="btn btn-square btn-ghost"
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
        <Link href="/" className="btn btn-ghost normal-case text-xl lg:hidden">Zenith</Link>
        <div className='hidden w-full max-w-sm lg:flex'>
          <div className="form-control">
            <div className="input-group flex items-center gap-2">
              <input type="text" placeholder="Search…" className="input input-bordered" />
              <button className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-none gap-2">

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

          <Theme />

        </div>

        <Notification />

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="User Profile Pic"
                width={48}
                height={48}
                src={userIcon}
              />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link href="/dashboard/staffs/profile" className="justify-between">
                Profile
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
