import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, facebookAuthProvider, googleAuthProvider } from '../../../firebase';
import { addUserToFirestore, checkIsAdminFirestore, getUserRole } from '../../helpers';
import { ILoginCredentials, UserRole } from '../../types';
import { setLoading, setUser } from './userSlice';

export const loginThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }: ILoginCredentials) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const role: UserRole = '';
      const currentUser = {
        uid: user.uid,
        email: user.email,
        token: user.refreshToken,
        role,
        isAdmin: false,
      };
      return currentUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return null;
  },
);

export const loginWithGoogle = createAsyncThunk('user/loginWithGoogle', async () => {
  try {
    const { user } = await signInWithPopup(auth, googleAuthProvider);
    const role: UserRole = '';
    const currentUser = {
      uid: user.uid,
      email: user.email,
      token: user.refreshToken,
      role,
      isAdmin: true,
    };
    await addUserToFirestore({ uid: user.uid, email: user.email, role, isAdmin: true });
    return currentUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return null;
});

export const loginWithFacebook = createAsyncThunk('user/loginWithFacebook', async () => {
  try {
    const { user } = await signInWithPopup(auth, facebookAuthProvider);
    const role: UserRole = '';
    await addUserToFirestore({ uid: user.uid, email: user.email, role, isAdmin: false });
    const currentUser = {
      uid: user.uid,
      email: user.email,
      token: user.refreshToken,
      role,
      isAdmin: false,
    };
    return currentUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return null;
});

export const registerThunk = createAsyncThunk(
  'user/register',
  async ({ email, password }: ILoginCredentials) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const role: UserRole = '';
      await addUserToFirestore({ uid: user.uid, email: user.email, role, isAdmin: false });
      const currentUser = {
        uid: user.uid,
        email: user.email,
        token: user.refreshToken,
        role,
        isAdmin: false,
      };
      return currentUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return null;
  },
);

export const userFirebaseController = createAsyncThunk(
  'user/controller',
  async (_, { dispatch }) => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const role = await getUserRole();
          const isAdmin = await checkIsAdminFirestore();
          const currentUser = {
            uid: user.uid,
            email: user.email,
            token: user.refreshToken,
            role,
            isAdmin,
          };
          dispatch(setUser(currentUser));
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    });
  },
);
