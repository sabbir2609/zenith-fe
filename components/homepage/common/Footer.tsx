import React from "react";
import { MountainSnow } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground p-8">
      <div className="container mx-auto grid gap-8 lg:grid-cols-4">
        <div className="flex flex-col items-start">
          <MountainSnow size={50} />
          <p className="mt-4">
            Zenith Systems <br />
            Providing reliable tech since 2023
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Services</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                Branding
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Design
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Marketing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Advertisement
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Company</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Press kit
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                Terms of use
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Cookie policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
