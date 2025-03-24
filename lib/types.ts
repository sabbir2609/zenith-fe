// lib/types.ts
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username?: string;
  password?: string;
  avatar?: string;
  role?: string;
  joined_at?: string;
  last_login?: string;
  is_active?: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface LoyaltyProgram {
  membership_id: string;
  status: string;
  points: number;
}

export interface Preferences {
  room_type: string;
  bed_type: string;
  smoking: boolean;
  view: string;
  amenities: string[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone_number: string;
}

export interface ReservationDetails {
  check_in_date: string;
  check_out_date: string;
  room_number: string;
  booking_id: string;
  payment_status: "Paid" | "Pending" | "Cancelled";
}

export interface GuestInfo {
  user: User;
  phone_number: string;
  address: Address;
  date_of_birth: string;
  gender: "Male" | "Female" | "Non-binary" | "Other";
  nationality: string;
  loyalty_program?: LoyaltyProgram;
  preferences?: Preferences;
  emergency_contact?: EmergencyContact;
  reservation_details?: ReservationDetails;
  profile_picture?: string;
  additional_notes?: string;
}

export interface StaffDocument {
  id: number;
  document: string;
  uploaded_at: string;
}

export interface StaffInfo {
  user: User;
  phone_number: string;
  address: Address;
  date_of_birth: string;
  nid: string;
  passport?: string;
  reference?: string;
  department: string;
  designation: string;
  date_of_joining: string;
  salary: number;
  documents: StaffDocument[];
  additional_notes?: string;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface Floor {
  level: number;
  is_elevator_accessible: boolean;
  description: string;
}

export interface Floors {
  level: number;
  is_elevator_accessible: boolean;
  description: string;
}

export interface RoomType {
  id: number;
  room_type: string;
  price: number;
  description: string;
}

interface Image {
  id: number;
  image: string;
  description: string | null;
}

interface Amenity {
  id: number;
  room: number;
  title: string;
  description: string;
  is_available: boolean;
}

export interface Room {
  id: number;
  floor: Floor;
  room_label: string;
  room_type: RoomType;
  capacity: number;
  description: string;
  is_available: boolean;
  images: Image[];
  amenities: Amenity[];
}
