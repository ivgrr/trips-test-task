import React, { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getAllTripsThunk, setTripThunk } from '../store/slices/trip/tripSlice';
import { IFirestoreTrip } from '../store/types';
import { useAuth } from '../hooks/useAuth';
import { TripList } from '../components/TripList';
import { TripForm } from '../components/TripForm';
import { UserNavbar } from '../components/UserNavbar';

export const TripsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();
  useEffect(() => {
    dispatch(getAllTripsThunk());
  }, [dispatch]);

  const handleAddTrip = async (trip: IFirestoreTrip) => {
    await dispatch(setTripThunk(trip));
  };

  return (
    <>
      <UserNavbar />
      <Container>
        {currentUser?.isAdmin && <TripForm handleAddTrip={handleAddTrip} />}
        <TripList />
      </Container>
    </>
  );
};
