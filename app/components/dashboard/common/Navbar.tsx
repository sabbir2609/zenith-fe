import Theme from "./Theme"
import Image from "next/image"

export default function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button lg:hidden ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Zenith</a>
            </div>

            <div className="flex-none gap-2">
                <div className="form-control hidden lg:block">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>

                <Theme />

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image alt="User Profile Pic" width={200} height={200} src="https://source.unsplash.com/random/200x200/?potrait" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}