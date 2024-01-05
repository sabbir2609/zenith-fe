"use client"

import Image from "next/image"
import { useRouter } from "next/navigation";
import userIcon from "./../../../static/image/user_icon.png";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const [logout] = useLogoutMutation();

    const { isAuthenticated } = useAppSelector(state => state.auth);

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

    const authLinks = (
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
    )

    const guestLinks = (
        <div className="space-x-2">
            <Link href='/auth/login' className="btn btn-sm btn-outline btn-primary">Login</Link>
            <Link href='/auth/register' className="btn btn-sm btn-outline btn-accent">Register</Link>
        </div>
    )

    return (
        <div className="navbar sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Zenith</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>

            <div className="navbar-end">
                {isAuthenticated ? authLinks : guestLinks}
            </div>

        </div>
    )
}