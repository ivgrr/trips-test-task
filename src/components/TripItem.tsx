import React, { FC } from 'react';
import { ListGroupItem } from 'react-bootstrap';

interface ITripItemProps {
  car: string;
  from: string;
  to: string;
}

export const TripItem: FC<ITripItemProps> = ({ car, from, to }) => {
  return (
    <ListGroupItem>
      <ListGroupItem>{car}</ListGroupItem>
      <ListGroupItem>{from}</ListGroupItem>
      <ListGroupItem>{to}</ListGroupItem>
    </ListGroupItem>
  );
};
