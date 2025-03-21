"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "../../ui/sidebar";
import { Separator } from "@/components/ui/separator";
import ThemeChange from "@/components/common/theme-change";

export default function Navbar() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        {/* breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList className="flex items-center">
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                {index > 0 && <BreadcrumbSeparator className="mx-2" />}
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                      className="hover:underline capitalize"
                    >
                      {segment}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* theme change - moved to the right */}
      <div className="flex items-center gap-2 px-4">
        <ThemeChange />
      </div>
    </header>
  );
}
