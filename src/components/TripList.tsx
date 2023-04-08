import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useAppSelector } from '../hooks/useAppSelector';
import { TripItem } from './TripItem';

export const TripList: FC = () => {
  const { trips } = useAppSelector((state) => state.trip);
  return (
    <ListGroup>
      {trips.map((trip) => (
        <TripItem key={trip.id} car={trip.car} from={trip.from} to={trip.to} />
      ))}
    </ListGroup>
  );
};
