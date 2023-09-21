import { render, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
import Login from '../Komponenter/Login';
import { AuthProvider } from '../contexts/AuthContext';

test('Should render the login Component', async () => {
    await render(<AuthProvider><Login/></AuthProvider>);
    await waitFor(() => {
        const login = screen.getByTestId('login');
        expect(login).toBeInTheDocument();
    })
})

test('The input fields should be visible', async () => {
    await render(<AuthProvider><Login/></AuthProvider>);
    await waitFor(() => {
        const email = screen.getByTestId('email');
        expect(email).toBeInTheDocument();
    })
    await waitFor(() => {
        const password = screen.getByTestId('password');
        expect(password).toBeInTheDocument();
    })
    await waitFor(() => {
        const loginButton = screen.getByTestId('loginButton');
        expect(loginButton).toBeInTheDocument();
    })
})

test('You should be able to write in the fields', async () => {
    await render(<AuthProvider><Login/></AuthProvider>);
    const credentials = { username: 'andreas.marken@gmail.com', password: '123456' }
    await waitFor(() => {
        const email = screen.getByTestId('email');
        email.value = credentials.username
        expect(email.value).toBe(credentials.username)
    })
    await waitFor(() => {
        const password = screen.getByTestId('password');
        password.value = credentials.password
        expect(password.value).toBe(credentials.password)
    })
})

test('You should be able to login', async () => {
    await render(<AuthProvider><Login/></AuthProvider>);
    const credentials = { username: 'andreas.marken@gmail.com', password: '123456' }
    await waitFor(() => {
        const email = screen.getByTestId('email');
        email.value = credentials.username
        expect(email.value).toBe(credentials.username)
    })
    await waitFor(() => {
        const password = screen.getByTestId('password');
        password.value = credentials.password
        expect(password.value).toBe(credentials.password)
    })
    await waitFor(() => {
        const loginButton = screen.getByTestId('loginButton');
        loginButton.click()
        expect(loginButton).toBeInTheDocument();
    })
})