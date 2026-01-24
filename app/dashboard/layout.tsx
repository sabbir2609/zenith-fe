import AppSidebar from "@/components/dashboard";
import Navbar from "@/components/dashboard/navbar/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className="p-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
