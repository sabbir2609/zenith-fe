"use client";

import { useContext, ReactNode } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function ClientThemeWrapper({ children }: { children: ReactNode }) {
    const { theme } = useContext(ThemeContext) as { theme: string };

    return (
        <div data-theme={theme}>
            {children}
        </div>
    );
}