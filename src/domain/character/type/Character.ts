import type { GenderType, SpeciesType, StatusType } from './CharacterResponse';

export interface Character {
    id: string;
    name: string;
    status: StatusType;
    species: SpeciesType;
    type: string;
    gender: GenderType;
}
