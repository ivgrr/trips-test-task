import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer } from './slices/user/userSlice';
import { usersReducer } from './slices/users/usersSlice';
import { tripReducer } from './slices/trip/tripSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    trip: tripReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
