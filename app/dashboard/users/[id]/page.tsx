import {
  Mail,
  MapPin,
  Phone,
  Calendar,
  User,
  Flag,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User as UserType } from "@/lib/types";

export default async function Page({ params }: { params: { id: number } }) {
  const id = await params.id;
  const user: UserType = {
    id: id,
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    avatar: "/user.png",
    role: "Admin",
    joined_at: "2021-01-01",
    last_login: "2021-01-01",
    is_active: true,
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            User Profile
          </h1>
        </div>
        <Badge
          variant={user.is_active ? "default" : "destructive"}
          className="px-3 py-1 text-sm"
        >
          {user.is_active ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user.avatar || "/user.png"}
                  alt={`${user.first_name} ${user.last_name}`}
                />
                <AvatarFallback className="text-lg">
                  {user.first_name[0]}
                  {user.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <CardTitle className="text-xl mb-1">
                  {user.first_name} {user.last_name}
                </CardTitle>
                <Badge variant="outline" className="px-3 py-1">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="overflow-hidden text-ellipsis">
                <span className="text-sm text-muted-foreground block">
                  Email
                </span>
                <span className="font-medium">{user.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground block">
                  Joined
                </span>
                <span className="font-medium">{user.joined_at}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Flag className="h-5 w-5 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground block">
                  Last login
                </span>
                <span className="font-medium">{user.last_login}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              User&apos;s personal and contact details
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <span className="text-sm font-medium">Address</span>
                  <p className="text-muted-foreground">
                    123 Main St, Springfield, IL 62701
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <span className="text-sm font-medium">Phone</span>
                  <p className="text-muted-foreground">(217) 555-1234</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <span className="text-sm font-medium">Email</span>
                  <p className="text-muted-foreground">
                    <a
                      href={`mailto:${user.email}`}
                      className="hover:underline"
                    >
                      {user.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <span className="text-sm font-medium">Role</span>
                  <p className="text-muted-foreground">{user.role}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline">Reset Password</Button>
            <Button asChild>
              <Link href={`/dashboard/users/${user.id}/edit`}>
                Edit Profile
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions performed by the user
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              No recent activity to display
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
