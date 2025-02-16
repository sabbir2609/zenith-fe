import AppSidebar, { AuthGuard } from "@/components/dashboard";
import Navbar from "@/components/dashboard/navbar/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <AuthGuard>
          <main className="flex-1 px-6 py-4">{children}</main>
        </AuthGuard>
      </SidebarInset>
    </SidebarProvider>
  );
}
