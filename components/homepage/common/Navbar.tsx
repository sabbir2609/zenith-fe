"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { AuthSection } from "./AuthSection";

export default function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "About",
      path: "/about",
      subLinks: [
        { name: "Mission", path: "homepage/about/mission" },
        { name: "Vision", path: "homepage/about/vision" },
      ],
    },
    { name: "Contact", path: "homepage/contact" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-10 bg-background shadow-sm">
      <div className="flex items-center justify-between p-3">
        {/* Mobile Navigation */}
        <div className="flex items-center lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="outline-none">
                <Menu size={20} className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="m-2 w-48">
              {navLinks.map((link, index) => (
                <DropdownMenuItem key={index}>
                  {link.subLinks ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex items-center justify-between w-full cursor-pointer">
                          <span>{link.name}</span>
                          <ChevronDown size={16} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 ml-6">
                        {link.subLinks.map((subLink, i) => (
                          <DropdownMenuItem key={i}>
                            <Link href={subLink.path}>{subLink.name}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link href={link.path}>{link.name}</Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/" className="text-xl font-bold">
            Zenith
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Zenith
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              {navLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  {link.subLinks ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <NavigationMenuLink className="cursor-pointer">
                          {link.name}
                        </NavigationMenuLink>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {link.subLinks.map((subLink, i) => (
                          <DropdownMenuItem key={i}>
                            <Link href={subLink.path}>{subLink.name}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link href={link.path}>{link.name}</Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Auth Links */}
        <AuthSection />
      </div>
    </header>
  );
}
