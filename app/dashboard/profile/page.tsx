import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/server-actions";
import Link from "next/link";
import { Mail, User as UserIcon, Calendar, Edit } from "lucide-react";
import { User } from "@/lib/types";
import AvatarUploader from "@/components/dashboard/profile/avatar-uploader";
import { getAccessToken } from "@/lib/auth-actions";
import ChangePassword from "@/components/dashboard/profile/change-password";

export default async function ProfilePage() {
  const accessToken = await getAccessToken();
  const profile: User = await fetchData("auth/users/me/");

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Profile Summary Card */}
        <Card className="h-fit">
          <CardContent className="flex flex-col items-center pt-6">
            <div className="mb-4 relative group">
              <div className="relative h-32 w-32">
                <AvatarUploader
                  user={profile}
                  accessToken={accessToken || ""}
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold">
              {profile.first_name} {profile.last_name}
            </h2>

            <Badge className="mt-2" variant="outline">
              {profile.role}
            </Badge>

            <div className="w-full border-t mt-6 pt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/profile/edit">
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal account details</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <div className="flex items-center text-muted-foreground">
                <UserIcon className="h-4 w-4 mr-2" /> Username
              </div>
              <div className="font-medium">@{profile.username}</div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" /> Email Address
              </div>
              <div className="font-medium">{profile.email}</div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" /> Member Since
              </div>
              <div className="font-medium">March 2024</div>
            </div>
          </CardContent>

          <CardFooter className="border-t flex justify-between pt-6">
            <ChangePassword accessToken={accessToken || ""} />

            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
