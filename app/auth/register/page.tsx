import Image from "next/image";
import userIcon from "./../../../static/image/user_icon.png";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center">
      <div className="w-full p-6 m-auto  rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center">Register</h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full input input-bordered"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered"
            />
          </div>
          <div>
            <button className="btn btn-block">Sign Up</button>
          </div>
          <div className="pt-4">
            Already have an account ?
            <Link
              href="#"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
