import { fetchData, patchData } from "@/lib/server-actions";
import { User } from "@/lib/types";
import Form from "next/form";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { SubmitButton } from "@/components/dashboard/common/submit-button";

export default async function ProfileEditPage() {
  const profile: User = await fetchData("auth/users/me/");

  async function updateProfile(formData: FormData) {
    "use server";

    const updatedProfile = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      username: formData.get("username") as string,
    };

    const response = await patchData(`auth/users/me/`, updatedProfile);

    if (response && response.ok) {
      redirect(`/dashboard/profile?updated=true`);
    } else {
      throw new Error("Failed to update profile");
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/dashboard/profile">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Profile</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>

        <Form action={updateProfile}>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  defaultValue={profile.first_name}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  defaultValue={profile.last_name}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={profile.email}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue={profile.username}
                required
              />
              <p className="text-xs text-muted-foreground">
                This will be used for your profile URL: zenith.com/users/
                {profile.username}
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile">Cancel</Link>
            </Button>

            <SubmitButton label="Save Changes"></SubmitButton>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
