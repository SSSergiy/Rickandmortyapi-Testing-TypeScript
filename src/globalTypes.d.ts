export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: string[];
}
export interface CharacterList {
  characters: Character[];
}
export interface Character {
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: string[];
}
