import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterList from '../CharacterList/CharacterList';
import { Character } from '../globalTypes';
import './App.css';

const App: FunctionComponent = (): ReactElement => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [errror, setErrror] = useState(false);
  const navigate = useNavigate();

  useEffect((): void => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      const data = await response.json();
      setCharacters(data.results);
      setErrror(false);
    } catch (error) {
      setErrror(true);
      console.log(`Error fetching characters:  ${error}`);
    }
  };

  const handleCharacterClick = (character: Character): void => {
    navigate(`/${character.id}`, { state: { data: character } });
  };

  const handlePrevPage = (): void => {
    setPage((prevPage): number => (prevPage >= 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = (): void => {
    setPage((prevPage): number => prevPage + 1);
  };

  return (
    <div data-testid='my-component'>
      <div className='container'>
        <div className='flex'>
          <button
            className='characterName btn'
            disabled={page === 1}
            onClick={handlePrevPage}
          >
            Previous Page
          </button>
          <button onClick={handleNextPage} className='characterName btn'>
            Next Page
          </button>
        </div>
        <h1>Rick and Morty Characters</h1>
        {errror && <span>Something went wrong ...</span>}
        <CharacterList
          characters={characters}
          handleCharacterClick={handleCharacterClick}
        />
      </div>
    </div>
  );
};

export default App;
