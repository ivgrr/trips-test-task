import React, { FC, useEffect } from 'react';
import './App.css';
import { AppRouter } from './router/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { userFirebaseController } from './store/slices/user/userThunks';
import { useAppDispatch } from './hooks/useAppDispatch';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userFirebaseController());
  }, [dispatch]);

  return <AppRouter />;
};
