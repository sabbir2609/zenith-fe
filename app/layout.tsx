import type { Metadata } from "next";
// import Script from "next/script";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Duru_Sans } from "next/font/google";

// const mainfoldCF = localFont({
//   src: [
//     {
//       path: '../fonts/manifold-cf/manifold_cf_regular.otf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../fonts/manifold-cf/Manifold_CF_Bold.otf',
//       weight: '700',
//       style: 'normal',
//     }
//   ]
// });

const duruSans = Duru_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zenith System",
  description: "Zenith System Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <Script
          src="//unpkg.com/react-scan/dist/auto.global.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        /> */}
      </head>
      <body
        className={`${duruSans.className} antialiased scroll-smooth`}
      >
        <NextTopLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
