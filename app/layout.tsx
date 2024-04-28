import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/redux/provider";
import Setup from "@/components/utils/Setup";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/context/ThemeContext";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenith System",
  description: "Zenith System Frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body className={`${inter.className}`}>
        <Provider>

          <ThemeProvider>
            <ClientThemeWrapper>

              <Setup />
              {children}

            </ClientThemeWrapper>
          </ThemeProvider>

        </Provider>
      </body>
    </html>
  );
}
