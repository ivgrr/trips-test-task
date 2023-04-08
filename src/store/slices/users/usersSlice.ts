import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole, IFirestoreUser } from '../../types';
import { getAllFirestoreUsers, updateUserRole } from '../../helpers';

const initialState: { users: IFirestoreUser[]; isLoading: boolean } = {
  users: [],
  isLoading: false,
};

export const getAllFirestoreUsersThunk = createAsyncThunk('firestore/getUsers', async () => {
  try {
    const users = await getAllFirestoreUsers();
    return users;
  } catch {
    throw new Error('Failed to load users');
  }
});

export const updateFirestoreUserRoleThunk = createAsyncThunk(
  'users/updateRole',
  async ({ uid, role }: { uid: string; role: UserRole }) => {
    try {
      await updateUserRole(uid, role);
    } catch {
      throw new Error('Failed to update user role');
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateLocalUserRole(state, action: PayloadAction<{ uid: string; role: UserRole }>) {
      const user = state.users.find((user) => user.uid === action.payload.uid);
      if (user) {
        user.role = action.payload.role;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFirestoreUsersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFirestoreUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllFirestoreUsersThunk.rejected, (state) => {
        state.isLoading = false;
        state.users = [];
      })
      .addCase(updateFirestoreUserRoleThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFirestoreUserRoleThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFirestoreUserRoleThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const { updateLocalUserRole } = usersSlice.actions;
