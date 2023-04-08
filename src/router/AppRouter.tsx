import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { adminRoutes, privateRoutes, publicRoutes } from './index';

export const AppRouter: FC = () => {
  const { isAuth, isLoading, error, currentUser } = useAuth();

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (currentUser && currentUser.isAdmin) {
    privateRoutes.push(...adminRoutes);
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route path={route.path} element={<route.element />} key={route.path}></Route>
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={<route.element />} key={route.path}></Route>
      ))}
    </Routes>
  );
};
