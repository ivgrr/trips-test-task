type FireStoreRoles = 'driver' | 'passenger' | 'dispatcher' | '';

interface IFireStoreTrip {
  id: string;
  car: string;
  from: string;
  to: string;
  users: IFireStoreUser[];
}

interface IFireStoreUser {
  uid: string;
  email: string | null;
  role: FireStoreRoles;
  isAdmin: boolean;
}

export type { IFireStoreUser, FireStoreRoles, IFireStoreTrip };
