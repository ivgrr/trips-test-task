import React, { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { registerThunk } from '../store/slices/user/userThunks';
import { RouteNames } from '../router';

export const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(registerThunk({ email, password }));
    navigate(RouteNames.USER_PAGE);
  };
  return (
    <Form className='mx-auto w-50 mt-5'>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Enter email'
        />
        <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Password'
        />
      </Form.Group>
      <Form.Group>
        <Button variant='primary' type='submit' onClick={handleRegister}>
          Register
        </Button>
        <Link className='ml-3 text-danger p-1' to={RouteNames.LOGIN}>
          Login
        </Link>
      </Form.Group>
    </Form>
  );
};
