import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFireStoreTrip } from '../../../utils/types';
import { addTripToFirestore, getAllFirestoreTrips } from '../../../utils/firebase-utils';

const initialState: {
  trip: IFireStoreTrip;
  trips: IFireStoreTrip[];
  isLoading: boolean;
} = {
  trip: {
    id: '',
    car: '',
    from: '',
    to: '',
    users: [],
  },
  trips: [],
  isLoading: false,
};

export const setTripThunk = createAsyncThunk('trip/setTrip', async (trip: IFireStoreTrip) => {
  try {
    await addTripToFirestore(trip);
    return trip;
  } catch {
    throw new Error('Failed to set trip');
  }
});

export const getAllTripsThunk = createAsyncThunk('trip/getTrips', async () => {
  try {
    const trips = await getAllFirestoreTrips();
    return trips;
  } catch {
    throw new Error('Failed to get trips');
  }
});

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTripsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTripsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trips = action.payload;
      })
      .addCase(getAllTripsThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setTripThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setTripThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trip = action.payload;
        state.trips.push(action.payload);
      })
      .addCase(setTripThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const tripReducer = tripSlice.reducer;
