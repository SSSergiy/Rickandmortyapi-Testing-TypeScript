import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, useLocation } from 'react-router-dom';
import CharacterDetails from './CharacterDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}));

const hit = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1'
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3'
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/51'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z'
};

describe('<CharacterDetails/>, and emulation useLocation() state', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      state: { character: hit }
    });
    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );
  });
  it('Checking for the correctness of the data display', () => {
    screen.getByText(hit.name);
    expect(screen.getByText(hit.name)).toBeInTheDocument();
    expect(screen.getByText(hit.status)).toBeInTheDocument();
    expect(screen.getByText(hit.species)).toBeInTheDocument();
    expect(screen.getByText(hit.gender)).toBeInTheDocument();
    expect(screen.getByText(hit.origin.name)).toBeInTheDocument();
    expect(screen.getByText(hit.episode.length)).toBeInTheDocument();
    expect(screen.getByText(hit.location.name)).toBeInTheDocument();
    expect(screen.getByText(hit.name)).toBeInTheDocument();
  });
  it('Background check', () => {
    const detailsBlock = screen.getByTestId('details-page');
    expect(detailsBlock).toHaveAttribute('class', 'character-details');
    expect(detailsBlock).toHaveStyle(
      'background-image: url("../../public/Leonardo.jpg"'
    );
  });
  it('Header check', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: hit.name })
    ).toBeInTheDocument();
  });
  it('Checking for a Button', () => {
    expect(screen.getByRole('button', { name: /goBack/i })).toBeInTheDocument();
  });

  it('Checking button functionality', () => {
    const goBackMock = jest.fn();
    const btn = screen.getByRole('button', { name: /goBack/i });
    btn.addEventListener('click', goBackMock);
    act(() => {
      userEvent.click(btn);
    });

    expect(goBackMock).toHaveBeenCalledTimes(1);
    btn.removeEventListener('click', goBackMock);
  });

  it('Image rendering check', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
    const imgElement = screen.getByAltText(hit.name);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', hit.image);
  });
});
