import type { Metadata } from 'next'
import Sidebar from '../../components/dashboard/common/Sidebar'
import Navbar from '../../components/dashboard/common/Navbar'
import Footer from '../../components/dashboard/common/Footer'


export const metadata: Metadata = {
    title: 'Zenith System',
    description: 'Zenith System Dashboard',
}


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="drawer lg:drawer-open h-screen ">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                <Navbar />

                {children}

                <Footer />

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <Sidebar />
                </ul>

            </div>
        </div>
    )
}