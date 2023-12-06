import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/redux/provider";
import Fab from "@/components/homepage/common/Fab";
import Setup from "@/components/utils/Setup";

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
      <body className={inter.className}>
        <Provider>
          <Setup />
          {children}
        </Provider>
      </body>
    </html>
  );
}
