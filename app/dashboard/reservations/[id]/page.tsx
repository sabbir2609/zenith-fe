import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, DoorClosed, CreditCard } from "lucide-react";

interface Reservation {
  id: number;
  user: string;
  room: string;
  start_date: string;
  end_date: string;
  payment_status: string;
  total_amount: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const reservation: Reservation = {
    id: parseInt(params.id),
    user: "John Doe",
    room: "A101",
    start_date: "2021-01-01",
    end_date: "2021-01-03",
    payment_status: "pending",
    total_amount: 10000,
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Reservation Details</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Guest Name</p>
                <p className="text-lg font-medium">{reservation.user}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Room Number</p>
                <div className="flex items-center gap-2">
                  <DoorClosed className="h-4 w-4" />
                  <p className="text-lg font-medium">{reservation.room}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Check-in Date</p>
                <p className="text-lg font-medium">{reservation.start_date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Check-out Date</p>
                <p className="text-lg font-medium">{reservation.end_date}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <Badge
                  variant={
                    reservation.payment_status === "paid"
                      ? "default"
                      : "secondary"
                  }
                  className="mt-1"
                >
                  {reservation.payment_status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-lg font-medium">
                  ${reservation.total_amount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
