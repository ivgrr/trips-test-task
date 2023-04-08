import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserState } from './types';
import {
  loginThunk,
  loginWithFacebook,
  loginWithGoogle,
  registerThunk,
  userFirebaseController,
} from './userThunks';

const initialState: IUserState = {
  currentUser: {
    uid: '',
    email: null,
    token: '',
    role: '',
    isAdmin: false,
  },
  error: null,
  isAuth: false,
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    removeUser(state) {
      state.currentUser = null;
      state.isAuth = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.currentUser = null;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.currentUser = null;
      })
      .addCase(loginWithFacebook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(loginWithFacebook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.currentUser = null;
      })
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.currentUser = null;
      })
      .addCase(userFirebaseController.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userFirebaseController.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(userFirebaseController.rejected, (state, action) => {
        state.error = action.error;
        state.currentUser = null;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { setUser, removeUser, setLoading } = userSlice.actions;
