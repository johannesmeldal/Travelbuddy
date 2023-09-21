import { render, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
import RandomColor from '../Komponenter/RandomColor';
import { AuthProvider } from '../contexts/AuthContext';

test('Should render the RandomColor Component', async () => {
    await render(<AuthProvider><RandomColor/></AuthProvider>);
    await waitFor(() => {
        const randomColor = screen.getByTestId('randomColor');
        expect(randomColor).toBeInTheDocument();
    })
})