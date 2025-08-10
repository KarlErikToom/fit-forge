// components/ClientLayout.jsx
"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideSidebar = ["/login", "/signup"].includes(pathname);

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
