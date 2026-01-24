import Image from "next/image";
import Link from "next/link";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-linear-to-b from-orange-600 to-gray-200">
            <div className="mx-auto max-w-md w-full px-6 py-10 flex min-h-screen flex-col">
                <Link
                    className="flex items-center justify-center mb-4"
                    href="/"
                >
                    <Image
                        src="/zenith-logo.png"
                        alt="Zenith logo"
                        width={622}
                        height={153}
                        className="h-12 w-auto"
                        priority
                    />
                </Link>

                <div className="">
                    {children}
                </div>

                <p className="mt-auto pt-6 text-center text-xs text-muted-foreground">
                    Secure authentication • Do not share your credentials
                </p>
            </div>
        </main>
    );
}