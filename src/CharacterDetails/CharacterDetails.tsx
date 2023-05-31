import { FunctionComponent, ReactElement } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Character } from '../globalTypes';
import './CharacterDetails.css';

const CharacterDetails: FunctionComponent = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = (location.state as { character: Character })?.character;

  const goBackMock = (): void => {
    navigate(-2);
  };

  return (
    <div className='character-details' data-testid='details-page'>
      <button
        className='back-button'
        data-testid='button-back'
        onClick={goBackMock}
      >
        goBack
      </button>
      <h2 className='character-name'>{data?.name}</h2>
      <img src={data?.image} alt={data?.name} className='character-image' />
      <div className='character-info'>
        <div>
          <strong>Gender:</strong> {data?.gender}
        </div>
        <div>
          <strong>Species:</strong> {data?.species}
        </div>
        <div>
          <strong>Status:</strong> {data?.status}
        </div>
        <div>
          <strong>Origin:</strong> {data?.origin.name}
        </div>
        <div>
          <strong>Last Location:</strong> {data?.location.name}
        </div>
        <div>
          <strong>Episode Count:</strong> {data?.episode.length}
        </div>
        <div>
          <strong>Episodes:</strong>
          <ul className='episode-list'>
            {data?.episode.map(
              (episode, index): ReactElement => (
                <li key={index}>
                  <a href={episode}>{episode}</a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
