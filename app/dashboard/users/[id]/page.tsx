import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

interface Address {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

interface LoyaltyProgram {
    membership_id: string;
    status: string;
    points: number;
}

interface Preferences {
    room_type: string;
    bed_type: string;
    smoking: boolean;
    view: string;
    amenities: string[];
}

interface EmergencyContact {
    name: string;
    relationship: string;
    phone_number: string;
}

interface ReservationDetails {
    check_in_date: string;
    check_out_date: string;
    room_number: string;
    booking_id: string;
    payment_status: 'Paid' | 'Pending' | 'Cancelled';
}

interface UserInfo {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: Address;
    date_of_birth: string;
    gender: 'Male' | 'Female' | 'Non-binary' | 'Other';
    nationality: string;
    loyalty_program?: LoyaltyProgram;
    preferences?: Preferences;
    emergency_contact?: EmergencyContact;
    reservation_details?: ReservationDetails;
    profile_picture?: string;
    additional_notes?: string;
}



export default function Page({ params }: { params: { id: string } }) {
    const user: UserInfo = {
        "id": 12345,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "phone_number": "+1234567890",

        "address": {
            "street": "123 Main St",
            "city": "Metropolis",
            "state": "CA",
            "postal_code": "12345",
            "country": "USA"
        },
        "date_of_birth": "1980-05-15",
        "gender": "Male",
        "nationality": "American",
        "loyalty_program": {
            "membership_id": "LP123456789",
            "status": "Gold",
            "points": 15000
        },
        "preferences": {
            "room_type": "Suite",
            "bed_type": "King",
            "smoking": false,
            "view": "Sea",
            "amenities": ["WiFi", "Mini-bar", "TV"]
        },
        "emergency_contact": {
            "name": "Jane Doe",
            "relationship": "Spouse",
            "phone_number": "+0987654321"
        },
        "reservation_details": {
            "room_number": "A101",
            "booking_id": "B123456789",
            "payment_status": "Paid",
            "check_in_date": "2022-01-01",
            "check_out_date": "2022-01-07"
        },
        "profile_picture": "https://source.unsplash.com/random/500x500?face,man",
        "additional_notes": "VIP guest, prefers quiet rooms"
    }


    return (
        <div className="flex flex-col p-2">
            <h1 className="text-2xl font-semibold">User Details: {params.id.toString()}</h1>
            <div className="flex flex-col lg:flex-row md:flex-row gap-4 p-4">
                <div className="flex flex-col items-center">
                    {user.profile_picture && <Image src={user.profile_picture} alt="Profile Picture" width={200} height={200} className="rounded-full" />}
                </div>
                <div className="flex flex-col lg:flex-row gap-4">

                    <div className="flex flex-col whitespace-nowrap">
                        <h2 className="text-xl font-semibold">Personal Information</h2>
                        <p><span className="font-semibold">Name:</span> {user.first_name} {user.last_name}</p>
                        <p><span className="font-semibold">Email:</span> {user.email}</p>
                        <p><span className="font-semibold">Phone:</span> {user.phone_number}</p>
                        <p><span className="font-semibold">Date of Birth:</span> {user.date_of_birth}</p>
                        <p><span className="font-semibold">Gender:</span> {user.gender}</p>
                        <p><span className="font-semibold">Nationality:</span> {user.nationality}</p>
                    </div>

                    <div className="flex flex-col whitespace-nowrap">
                        <h2 className="text-xl font-semibold">Address</h2>
                        <p><span className="font-semibold">Street:</span> {user.address.street}</p>
                        <p><span className="font-semibold">City:</span> {user.address.city}</p>
                        <p><span className="font-semibold">State:</span> {user.address.state}</p>
                        <p><span className="font-semibold">Postal Code:</span> {user.address.postal_code}</p>
                        <p><span className="font-semibold">Country:</span> {user.address.country}</p>
                    </div>
                    {user.emergency_contact && (
                        <div className="flex flex-col whitespace-nowrap">
                            <h2 className="text-xl font-semibold">Emergency Contact</h2>
                            <p><span className="font-semibold">Name:</span> {user.emergency_contact.name}</p>
                            <p><span className="font-semibold">Relationship:</span> {user.emergency_contact.relationship}</p>
                            <p><span className="font-semibold">Phone:</span> {user.emergency_contact.phone_number}</p>
                        </div>
                    )}

                </div>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row gap-4 p-4">

                <div className="flex flex-col whitespace-nowrap">
                    <h2 className="text-xl font-semibold">Loyalty Program</h2>
                    <p><span className="font-semibold">Membership ID:</span> {user.loyalty_program?.membership_id}</p>
                    <p><span className="font-semibold">Status:</span> {user.loyalty_program?.status}</p>
                    <p><span className="font-semibold">Points:</span> {user.loyalty_program?.points}</p>
                </div>

                <div className="flex flex-col whitespace-nowrap">
                    <h2 className="text-xl font-semibold">Preferences</h2>
                    <p><span className="font-semibold">Room Type:</span> {user.preferences?.room_type}</p>
                    <p><span className="font-semibold">Bed Type:</span> {user.preferences?.bed_type}</p>
                    <p><span className="font-semibold">Smoking:</span> {user.preferences?.smoking ? 'Yes' : 'No'}</p>
                    <p><span className="font-semibold">View:</span> {user.preferences?.view}</p>
                    <p><span className="font-semibold">Amenities:</span> {user.preferences?.amenities.join(', ')}</p>
                </div>
                <div className="flex flex-col flex-grow">
                    <h2>Additional Notes:</h2>
                    <p>{user.additional_notes}</p>
                </div>
            </div>

            <div className="divider"></div>

            <div className="flex flex-col p-8">
                <h2 className="text-2xl font-semibold p-4">Activity</h2>

                <h3>Reservation Details</h3>
                <p><span className="font-semibold">Room Number:</span> {user.reservation_details?.room_number}</p>
                <p><span className="font-semibold">Booking ID:</span> {user.reservation_details?.booking_id}</p>
                <p><span className="font-semibold">Payment Status:</span> {user.reservation_details?.payment_status}</p>
                <p><span className="font-semibold">Check-in Date:</span> {user.reservation_details?.check_in_date}</p>
                <p><span className="font-semibold">Check-out Date:</span> {user.reservation_details?.check_out_date}</p>
            </div>
        </div>
    )
}