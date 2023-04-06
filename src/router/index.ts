import { FunctionComponent, ReactNode } from 'react';
import { LoginPage, RegisterPage, UserPage, AdminPage, TripsPage, NotFoundPage } from '../pages/';

export interface IRoute {
  path: string;
  element: FunctionComponent<{ children?: ReactNode }>;
  replace?: boolean;
}

export enum RouteNames {
  LOGIN = '/login',
  REGISTER = '/register',
  USER_PAGE = '/',
  ADMIN_PAGE = '/admin',
  TRIPS = '/trips',
  NOT_FOUND = '*',
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, element: LoginPage },
  { path: RouteNames.REGISTER, element: RegisterPage },
  { path: RouteNames.NOT_FOUND, element: NotFoundPage },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.USER_PAGE, element: UserPage },
  { path: RouteNames.ADMIN_PAGE, element: AdminPage },
  { path: RouteNames.TRIPS, element: TripsPage },
  { path: RouteNames.NOT_FOUND, element: NotFoundPage },
];
