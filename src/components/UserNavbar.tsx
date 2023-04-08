import React, { FC } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../store/slices/user/userSlice';
import { RouteNames } from '../router';
import { auth } from '../firebase';
import { useAuth } from '../hooks/useAuth';

export const UserNavbar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = () => {
    dispatch(removeUser());
    navigate(RouteNames.LOGIN);
    auth.signOut();
  };
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          {currentUser?.isAdmin && (
            <Link className='text-danger' to={RouteNames.ADMIN_PAGE}>
              Admin
            </Link>
          )}
          <Link className='ml-2 text-secondary' to={RouteNames.TRIPS}>
            Trips
          </Link>
          <Link className='ml-2 text-secondary' to={RouteNames.USER_PAGE}>
            User
          </Link>
        </Nav>
        <Button onClick={handleLogout}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};
