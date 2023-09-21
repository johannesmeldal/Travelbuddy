import { render, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
import Signup from '../Komponenter/Signup';
import { AuthProvider } from '../contexts/AuthContext';

test('Should render the Signup Component', async () => {
    await render(<AuthProvider><Signup/></AuthProvider>);
    await waitFor(() => {
        const signup = screen.getByTestId('signup');
        expect(signup).toBeInTheDocument();
    })
})

test('Should find the input fields', async () => {
    await render(<AuthProvider><Signup/></AuthProvider>);
    await waitFor(() => {
        const epost = screen.getByTestId('epost');
        expect(epost).toBeInTheDocument();
    })
    await waitFor(() => {
        const passord = screen.getByTestId('passord');
        expect(passord).toBeInTheDocument();

    })
    await waitFor(() => {
        const passordbekreftelse = screen.getByTestId('passordbekreftelse');
        expect(passordbekreftelse).toBeInTheDocument();
    })
    await waitFor(() => {
        const bekreft = screen.getByTestId('bekreft');
        expect(bekreft).toBeInTheDocument();
    })
})

test('Should be able to input into the input fields', async () => {
    await render(<AuthProvider><Signup/></AuthProvider>);
    const credentials = { email: "testing@ntnu.no", passord: "123456", passordbekreftelse: "123456" }
    await waitFor(() => {
        const epost = screen.getByTestId('epost');
        epost.value = credentials.email;
        expect(epost.value).toBe(credentials.email)
    })
    await waitFor(() => {
        const passord = screen.getByTestId('passord');
        passord.value = credentials.passord;
        expect(passord.value).toBe(credentials.passord)
    })
    await waitFor(() => {
        const passordbekreftelse = screen.getByTestId('passordbekreftelse');
        passordbekreftelse.value = credentials.passordbekreftelse;
        expect(passordbekreftelse.value).toBe(credentials.passordbekreftelse)
    })
    await waitFor(() => {
        const bekreft = screen.getByTestId('bekreft');
        expect(bekreft).toBeInTheDocument();
    })
})

test('Should now be able to press the signup button', async () => {
    await render(<AuthProvider><Signup/></AuthProvider>);
    const credentials = { email: "testing@ntnu.no", passord: "123456", passordbekreftelse: "123456" }
    await waitFor(() => {
        const epost = screen.getByTestId('epost');
        epost.value = credentials.email;
        expect(epost.value).toBe(credentials.email)
    })
    await waitFor(() => {
        const passord = screen.getByTestId('passord');
        passord.value = credentials.passord;
        expect(passord.value).toBe(credentials.passord)
    })
    await waitFor(() => {
        const passordbekreftelse = screen.getByTestId('passordbekreftelse');
        passordbekreftelse.value = credentials.passordbekreftelse;
        expect(passordbekreftelse.value).toBe(credentials.passordbekreftelse)
    })
    await waitFor(() => {
        const bekreft = screen.getByTestId('bekreft');
        bekreft.click();
        expect(bekreft).toBeInTheDocument();
    })
})