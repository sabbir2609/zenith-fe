import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-orange-600 to-gray-200 p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <div className="mx-auto h-16 mb-4">
            <Image
              src="/zenith-logo.png"
              height={622}
              width={153}
              priority
              alt="Zenith Hotels"
              className="w-full h-full"
            />
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Error 404</p>
            <h1 className="text-3xl font-bold tracking-tight">
              Invalid Destination
            </h1>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            We apologize, but the page you&apos;re looking for seems to have checked out.
          </p>

          <div className="relative">
            <Input
              type="search"
              placeholder="Search our amenities..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="default" className="flex-1">
              <Link href="/">
                Return to Lobby
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/reservations">
                Make a Reservation
              </Link>
            </Button>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm text-center text-muted-foreground mb-4">
              Popular Destinations
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild variant="link" size="sm">
                <Link href="/rooms">Rooms & Suites</Link>
              </Button>
              <Button asChild variant="link" size="sm">
                <Link href="/dining">Dining</Link>
              </Button>
              <Button asChild variant="link" size="sm">
                <Link href="/spa">Spa & Wellness</Link>
              </Button>
              <Button asChild variant="link" size="sm">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}