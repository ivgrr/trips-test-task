import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { Link, useNavigate } from 'react-router-dom';
import { loginThunk, loginWithFacebook, loginWithGoogle } from '../store/slices/user/userThunks';
import { RouteNames } from '../router';
import { Button, Form } from 'react-bootstrap';

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(loginThunk({ email, password }));
    navigate(RouteNames.USER_PAGE);
  };

  const handleLoginWithGoogle = async () => {
    await dispatch(loginWithGoogle());
    navigate(RouteNames.USER_PAGE);
  };

  const handleLoginWithFacebook = async () => {
    await dispatch(loginWithFacebook());
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
      <Form.Group className='mt-2 mb-2'>
        <Button onClick={handleLoginWithGoogle} variant='info'>
          Google Login
        </Button>
        <Button onClick={handleLoginWithFacebook} variant='info' className='ml-2'>
          Facebook Login
        </Button>
      </Form.Group>
      <Form.Group>
        <Button variant='primary' type='submit' onClick={handleLogin}>
          Login
        </Button>
        <Link className='ml-3 text-danger p-1' to={RouteNames.REGISTER}>
          Register
        </Link>
      </Form.Group>
    </Form>
  );
};
