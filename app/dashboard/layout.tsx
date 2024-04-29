import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/common/Sidebar";
import Navbar from "@/components/dashboard/common/Navbar";
import Footer from "@/components/dashboard/common/Footer";
import Breadcrumb from "@/components/dashboard/common/Breadcrumbs";
import { RequireAuth } from "@/components/utils";

export const metadata: Metadata = {
  title: "Zenith System",
  description: "Zenith System Dashboard",
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (

    <RequireAuth>

      <div className="bg-base-100 drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="bg-base-200 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm">

            <Navbar />

          </div>


          <Breadcrumb
            homeElement={'Home'}
            separator={<span> {"/"} </span>}
            activeClasses='text-amber-500'
            containerClasses='flex py-2 px-1 text-sm'
            listClasses='hover:underline mx-2 font-bold'
            capitalizeLinks
          />

          <div className="p-1">

            {children}

          </div>

        </div>

        <div className="drawer-side z-40" style={{ scrollBehavior: "smooth", scrollPaddingTop: "5rem" }}>

          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

          <Sidebar />

        </div>

      </div>

    </RequireAuth>

  );
}
