import React, { FC, useState } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { UserRole } from '../store/types';
import {
  updateFirestoreUserRoleThunk,
  updateLocalUserRole,
} from '../store/slices/users/usersSlice';

interface IUserCardProps {
  uid: string;
  email: string | null;
  role: string;
}

export const UserCard: FC<IUserCardProps> = ({ uid, email, role }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('');
  const dispatch = useAppDispatch();

  const handleUpdateRole = async (uid: string) => {
    await dispatch(updateFirestoreUserRoleThunk({ uid, role: selectedRole }));
    dispatch(updateLocalUserRole({ uid, role: selectedRole }));
  };

  return (
    <Col className='my-3'>
      <Card className='h-100'>
        <Card.Body>
          <Card.Title>{email}</Card.Title>
          <Card.Text>Current role: {role}</Card.Text>
          <Form.Group controlId={`roleSelect_${uid}`}>
            <Form.Label>Change role to:</Form.Label>
            <Form.Control
              as='select'
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            >
              <option value=''>-</option>
              <option value='driver'>Driver</option>
              <option value='passenger'>Passenger</option>
              <option value='dispatcher'>Dispatcher</option>
            </Form.Control>
          </Form.Group>
          <Button
            className='mt-2'
            variant='primary'
            disabled={!selectedRole}
            onClick={() => handleUpdateRole(uid)}
          >
            Update Role
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
