import AppSidebar from "@/components/dashboard";
import Navbar from "@/components/dashboard/navbar/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <SidebarInset>
          <main>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
