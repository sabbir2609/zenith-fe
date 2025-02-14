import { redirect } from "next/navigation";
import { getServerAuthStatus } from "@/lib/auth-actions";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default async function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = await getServerAuthStatus();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
