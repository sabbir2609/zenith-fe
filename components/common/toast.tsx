"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    searchParams.forEach((value, key) => {
      if (value !== "true") return;

      const toastKey = `toast-${pathname}-${key}`;
      if (sessionStorage.getItem(toastKey)) return;

      const resource = pathname.split("/").slice(-2, -1)[0] || "item";
      const resourceName = resource.charAt(0).toUpperCase() + resource.slice(1);

      const messages: Record<
        string,
        { message: string; type: "success" | "error" | "info" | "warning" }
      > = {
        created: {
          message: `${resourceName} created successfully`,
          type: "success",
        },
        updated: {
          message: `${resourceName} updated successfully`,
          type: "info",
        },
        deleted: {
          message: `${resourceName} deleted successfully`,
          type: "info",
        },
        error: { message: "An error occurred", type: "error" },
        exists: {
          message: `${resourceName} already exists`,
          type: "info",
        },
        // Add a new message for the
      };

      const { message, type } = messages[key] || {
        message: `${key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())} successful`,
        type: "success",
      };

      toast[type](message);
      sessionStorage.setItem(toastKey, "shown");
    });
  }, [searchParams, pathname]);

  return null;
}
