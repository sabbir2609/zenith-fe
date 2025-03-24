import {
  Mail,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  Home,
  Heart,
  Book,
  AlertCircle,
  Coffee,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GuestInfo } from "@/lib/types";

export default async function Page({ params }: { params: { id: number } }) {
  const resolveParams = await params;
  const id = resolveParams.id;
  const guest: GuestInfo = {
    user: {
      id: id,
      email: "alex@gmail.com",
      first_name: "Alex",
      last_name: "Doe",
      username: "alex.doe",
      avatar: "/avatar.jpg",
      role: "Guest",

      joined_at: "2021-01-01",
      is_active: true,
      last_login: "2021-12-31",
    },
    phone_number: "+1234567890",
    address: {
      street: "123 Main St",
      city: "Metropolis",
      state: "CA",
      postal_code: "12345",
      country: "USA",
    },
    date_of_birth: "1980-05-15",
    gender: "Male",
    nationality: "American",
    loyalty_program: {
      membership_id: "LP123456789",
      status: "Gold",
      points: 15000,
    },
    preferences: {
      room_type: "Suite",
      bed_type: "King",
      smoking: false,
      view: "Sea",
      amenities: ["WiFi", "Mini-bar", "TV"],
    },
    emergency_contact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone_number: "+0987654321",
    },
    reservation_details: {
      room_number: "A101",
      booking_id: "B123456789",
      payment_status: "Paid",
      check_in_date: "2022-01-01",
      check_out_date: "2022-01-07",
    },
    profile_picture: "/avatar.jpg",
    additional_notes: "VIP guest, prefers quiet rooms",
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold tracking-tight">guest Profile</h1>
        <Badge
          variant={
            guest.reservation_details?.payment_status === "Paid"
              ? "default"
              : guest.reservation_details?.payment_status === "Pending"
              ? "outline"
              : "destructive"
          }
        >
          {guest.reservation_details?.payment_status}
        </Badge>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-24 h-24 border">
              {guest.profile_picture ? (
                <AvatarImage
                  src={guest.profile_picture}
                  alt={`${guest.user.first_name} ${guest.user.last_name}`}
                />
              ) : (
                <AvatarFallback>
                  {guest.user.first_name[0]}
                  {guest.user.last_name[0]}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="space-y-3 flex-1">
              <div>
                <h2 className="text-2xl font-semibold">
                  {guest.user.first_name} {guest.user.last_name}
                </h2>
                <p className="text-muted-foreground">ID: {params.id}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{guest.user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{guest.phone_number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {guest.address.city}, {guest.address.country}
                  </span>
                </div>
              </div>

              {guest.loyalty_program && (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {guest.loyalty_program.status} Member
                  </span>
                  <Badge variant="outline">
                    {guest.loyalty_program.points} pts
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty & Preferences</TabsTrigger>
          <TabsTrigger value="reservation">Reservation</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date of Birth</span>
                  <span>{guest.date_of_birth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender</span>
                  <span>{guest.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nationality</span>
                  <span>{guest.nationality}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Street</span>
                  <span>{guest.address.street}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">City</span>
                  <span>{guest.address.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">State</span>
                  <span>{guest.address.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Postal Code</span>
                  <span>{guest.address.postal_code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <span>{guest.address.country}</span>
                </div>
              </CardContent>
            </Card>

            {guest.emergency_contact && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span>{guest.emergency_contact.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Relationship</span>
                    <span>{guest.emergency_contact.relationship}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span>{guest.emergency_contact.phone_number}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guest.loyalty_program && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Loyalty Program
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Membership ID</span>
                    <span>{guest.loyalty_program.membership_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline">
                      {guest.loyalty_program.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points</span>
                    <span>{guest.loyalty_program.points}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {guest.preferences && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room Type</span>
                    <span>{guest.preferences.room_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bed Type</span>
                    <span>{guest.preferences.bed_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Smoking</span>
                    <span>{guest.preferences.smoking ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">View</span>
                    <span>{guest.preferences.view}</span>
                  </div>
                  <Separator className="my-2" />
                  <div>
                    <p className="text-muted-foreground mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {guest.preferences.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reservation" className="mt-4">
          {guest.reservation_details && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  Reservation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span>{guest.reservation_details.booking_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room Number</span>
                    <span>{guest.reservation_details.room_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-in Date</span>
                    <span>{guest.reservation_details.check_in_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Check-out Date
                    </span>
                    <span>{guest.reservation_details.check_out_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Payment Status
                    </span>
                    <Badge
                      variant={
                        guest.reservation_details.payment_status === "Paid"
                          ? "default"
                          : guest.reservation_details.payment_status ===
                            "Pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {guest.reservation_details.payment_status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5" />
                Additional Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {guest.additional_notes || "No additional notes available."}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* joined at */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined At</span>
                <span>{guest.user.joined_at}</span>
              </div>
              {/* last login */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Login</span>
                <span>{guest.user.last_login}</span>
              </div>
              {/* is active  */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active</span>
                <span>{guest.user.is_active ? "Yes" : "No"}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
