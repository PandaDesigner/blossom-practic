import type { GenderType, SpeciesType, StatusType } from './CharacterResponse';

export interface Character {
    id: string;
    name: string;
    status: StatusType;
    species: SpeciesType;
    type: string;
    gender: GenderType;
    image: string;
    favorite: boolean;
    comments: string[];
    origin?: {
        name: string;
        url: string;
    };
    location?: {
        name: string;
        url: string;
    };
    episode?: string[];
    url?: string;
    created?: string;
}