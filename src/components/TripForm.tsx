import React, { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppSelector } from '../hooks/useAppSelector';
import { v4 as uuid } from 'uuid';
import { IFireStoreTrip } from '../utils/types';

interface ITripFormProps {
  handleAddTrip(trip: IFireStoreTrip): void;
}

export const TripForm: FC<ITripFormProps> = ({ handleAddTrip }) => {
  const { users } = useAppSelector((state) => state.users);

  const [newTrip, setNewTrip] = useState({
    from: '',
    to: '',
    car: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTrip((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { from, to, car } = newTrip;
    const id = uuid();
    const trip = { id, from, to, car, users };
    handleAddTrip(trip);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formFrom'>
        <Form.Label>From</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter from'
          name='from'
          value={newTrip.from}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId='formTo'>
        <Form.Label>To</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter to'
          name='to'
          value={newTrip.to}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId='formCar'>
        <Form.Label>Car</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter car'
          name='car'
          value={newTrip.car}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button className='mt-2 mb-2' variant='primary' type='submit'>
        Add Trip
      </Button>
    </Form>
  );
};
