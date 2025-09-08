import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInScreen from '../../src/screens/Auth/SignInScreen';

jest.mock('../../src/services/auth', () => ({
  signInWithEmailPassword: jest.fn(async () => ({})),
}));

describe('SignInScreen', () => {
  it('validates required fields', async () => {
    const { getByText } = render(<SignInScreen />);
    fireEvent.press(getByText('Sign In'));
    expect(getByText('Email and password are required.')).toBeTruthy();
  });

  it('calls sign in with email and password', async () => {
    const { signInWithEmailPassword } = require('../../src/services/auth') as {
      signInWithEmailPassword: jest.Mock;
    };
    const { getByPlaceholderText, getByText } = render(<SignInScreen />);
    fireEvent.changeText(getByPlaceholderText('you@example.com'), 'u@test.com');
    fireEvent.changeText(getByPlaceholderText('••••••••'), 'secret123');
    fireEvent.press(getByText('Sign In'));
    await waitFor(() => expect(signInWithEmailPassword).toHaveBeenCalledWith('u@test.com', 'secret123'));
  });
});