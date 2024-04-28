"use client";

import Loading from "@/app/loading";
import { createContext, useEffect, useState } from "react";


// eslint-disable-next-line
export const ThemeContext = createContext({} as { theme: string; changeTheme: (theme: string) => void });


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState("light");
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const localTheme = localStorage.getItem("theme") || "light";
        setTheme(localTheme);
    }, []);

    if (!isMounted) return <Loading />;

    const changeTheme = (theme: string) => {
        setTheme(theme);
        localStorage.setItem("theme", theme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};