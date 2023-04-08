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

export type { IUser, IUserState, ILoginCredentials, UserRole };
