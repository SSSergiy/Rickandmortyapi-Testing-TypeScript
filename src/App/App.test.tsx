import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
jest.mock('node-fetch');

describe('App.test.tsx', () => {
  it('renders App component, Checking for asynchrony and correctness of the query string, And checking page transitions', async () => {
    const fetchSpy = jest.spyOn(window, 'fetch');
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Rick Sanchez/i)).toBeNull();

    expect(await screen.findByText(/Rick Sanchez/i)).toBeInTheDocument();

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1'
    );

    act(() => {
      userEvent.click(screen.getByRole('button', { name: /Next Page/i }));
    });
    await waitFor(() => {
      expect(screen.queryByText(/Rick Sanchez/i)).toBeNull();
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /Previous Page/i }));
    });
    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /Next Page/i }));
    });
    await waitFor(() => {
      expect(screen.getByText(/Aqua Rick/i)).toBeInTheDocument();
    });
    fetchSpy.mockRestore();
  });

  it('renders App component with error', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => {
      throw new Error('Fetch error');
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });

    await act(async () => {
      const errorMessage = await screen.findByText('Something went wrong ...');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
