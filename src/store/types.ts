import { SerializedError } from '@reduxjs/toolkit';

type UserRole = 'driver' | 'passenger' | 'dispatcher' | '';

interface IUser {
  uid: string;
  email: string | null;
  token: string;
  role: UserRole;
  isAdmin: boolean;
}

interface IUserState {
  currentUser: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: null | SerializedError;
}

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IFirestoreTrip {
  id: string;
  car: string;
  from: string;
  to: string;
  users: IFirestoreUser[];
}

interface IFirestoreUser {
  uid: string;
  email: string | null;
  role: UserRole;
  isAdmin: boolean;
}

export type { IUser, IUserState, ILoginCredentials, UserRole, IFirestoreUser, IFirestoreTrip };
