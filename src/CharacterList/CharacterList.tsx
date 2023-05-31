import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../App/App.css';
import { Character } from '../globalTypes';
interface CharacterListProps {
  characters: Character[];
  handleCharacterClick: (character: Character) => void;
}
const CharacterList: FC<CharacterListProps> = ({
  characters,
  handleCharacterClick
}): ReactElement => {
  return (
    <ul data-testid='character-list' className='characterList'>
      {characters.map(
        (character, index: number): ReactElement => (
          <li
            key={character.id}
            className='characterItem'
            data-testid='characterItem'
          >
            <img
              src={character.image}
              alt={character.name}
              className='characterImage'
            />
            <div className='characterLetails'>
              <Link
                to={`/${character.id}`}
                state={{ character }}
                className='characterName'
                data-testid={`character-id-${index + 1}`}
                onClick={(): void => handleCharacterClick(character)}
              >
                {character.name}
              </Link>
              <p>
                <strong>Status:</strong> {character.status}
              </p>
              <p>
                <strong>Species:</strong> {character.species}
              </p>
              <p>
                <strong>Gender:</strong> {character.gender}
              </p>
              <p>
                <strong>Origin:</strong> {character.origin.name}
              </p>
              <p>
                <strong>Last Location:</strong> {character.location.name}
              </p>
              <p>
                <strong>Episode Count:</strong> {character.episode.length}
              </p>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default CharacterList;
