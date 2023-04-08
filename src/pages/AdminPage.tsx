import React, { FC, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import { getAllFirestoreUsersThunk } from '../store/slices/users/usersSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { UserCard } from '../components/UserCard';
import { UserNavbar } from '../components/UserNavbar';

export const AdminPage: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllFirestoreUsersThunk());
  }, [dispatch]);

  return (
    <>
      <UserNavbar />
      <Container>
        <Row xs={1} lg={2}>
          {users.map((user) => (
            <UserCard key={user.uid} email={user.email} uid={user.uid} role={user.role} />
          ))}
        </Row>
      </Container>
    </>
  );
};
