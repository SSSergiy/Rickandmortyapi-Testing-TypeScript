import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CharacterList from './CharacterList';
import { act } from 'react-dom/test-utils'

const hits = [
  {
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
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'unknown', url: '' },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3'
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/51'],
    url: 'https://rickandmortyapi.com/api/character/2',
    created: '2017-11-04T18:50:21.651Z'
  }
];

describe('< CharacterList />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CharacterList
          characters={hits}
          handleCharacterClick={(): void => {}}
        />
      </MemoryRouter>
    );
  });
  test('Checking for the correct number of elements', () => {
    const characterNames = screen.getAllByTestId('characterItem');
    expect(characterNames).toHaveLength(2);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('Checking for the correctness of the data display', () => {
    hits.forEach((hit) => {
      const imgElement = screen.getByAltText(hit.name);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', hit.image);
      const statusElements = screen.queryAllByText(hit.status);
      expect(statusElements.length).toBeGreaterThan(0);
      const speciesElements = screen.queryAllByText(hit.species);
      expect(speciesElements.length).toBeGreaterThan(0);
      const genderElements = screen.queryAllByText(hit.gender);
      expect(genderElements.length).toBeGreaterThan(0);
      const originNameElements = screen.queryAllByText(hit.origin.name);
      expect(originNameElements.length).toBeGreaterThan(0);
      const locationNameElements = screen.queryAllByText(hit.location.name);
      expect(locationNameElements.length).toBeGreaterThan(0);
      const episodeElements = screen.queryAllByText(hit.episode.length);
      expect(episodeElements.length).toBeGreaterThan(0);
    });
  });
  it('handles character click to link', () => {
    const mockLink = jest.fn();
    const characterLink = screen.getByRole('link', { name: 'Rick Sanchez' });
    characterLink.addEventListener('click', mockLink);
    act(() => {
      userEvent.click(characterLink);
    
    })
    expect(mockLink).toHaveBeenCalledTimes(1);
    characterLink.removeEventListener('click', mockLink);
  });
});
