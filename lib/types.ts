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
