import { render, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
import NavBar from '../Komponenter/NavBar';
import { AuthProvider } from '../contexts/AuthContext';

test('Should render the Navbar Component', async () => {
    await render(<AuthProvider><NavBar/></AuthProvider>);
    await waitFor(() => {
        const navbar = screen.getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    })
})

test('You should be able to press travelbuddy button', async () => {
    await render(<AuthProvider><NavBar/></AuthProvider>);
    await waitFor(() => {
        const navbar = screen.getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    })
    await waitFor(() => {
        const brand = screen.getByTestId('brand');
        brand.click();
        expect(brand).toBeInTheDocument();
    })
})

test('You should be able to press home button', async () => {
    await render(<AuthProvider><NavBar/></AuthProvider>);
    await waitFor(() => {
        const navbar = screen.getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    })
    await waitFor(() => {
        const home = screen.getByTestId('home');
        home.click();
        expect(home).toBeInTheDocument();
    })
})

test('You should be able to press profile button', async () => {
    await render(<AuthProvider><NavBar/></AuthProvider>);
    await waitFor(() => {
        const navbar = screen.getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    })
    await waitFor(() => {
        const profile = screen.getByTestId('profile');
        profile.click();
        expect(profile).toBeInTheDocument();
    })
})

test('You should be able to press email button', async () => {
    await render(<AuthProvider><NavBar/></AuthProvider>);
    await waitFor(() => {
        const navbar = screen.getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    })
    await waitFor(() => {
        const email = screen.getByTestId('email');
        email.click();
        expect(email).toBeInTheDocument();
    })
})