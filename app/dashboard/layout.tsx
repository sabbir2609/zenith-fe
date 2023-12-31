import type { Metadata } from "next";
import Sidebar from "../../components/dashboard/common/Sidebar";
import Navbar from "../../components/dashboard/common/Navbar";
import Footer from "../../components/dashboard/common/Footer";
import Breadcrumb from "@/components/dashboard/common/Breadcrumbs";
import { RequireAuth } from "@/components/utils";

export const metadata: Metadata = {
  title: "Zenith System",
  description: "Zenith System Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="drawer lg:drawer-open h-screen ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Navbar />
          <Breadcrumb
            homeElement={'Home'}
            separator={<span> {"/"} </span>}
            activeClasses='text-amber-500'
            containerClasses='flex py-5 text-sm'
            listClasses='hover:underline mx-2 font-bold'
            capitalizeLinks
          />
          <div className="m-1">
            {children}
          </div>
          <Footer />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <Sidebar />
          </ul>
        </div>
      </div>
    </RequireAuth>
  );
}
