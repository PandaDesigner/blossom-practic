export interface CharacterOrigin {
    name: string;
    url: string;
}

export interface CharacterLocation {
    name: string;
    url: string;
}

export enum CharacterStatusEnum {
    ALIVE = 'Alive',
    DEAD = 'Dead',
    UNKNOWN = 'unknown',
};

export type StatusType = (typeof CharacterStatusEnum)[keyof typeof CharacterStatusEnum];

export enum GenderEnum {
    FEMALE = 'Female',
    MALE = 'Male',
    GENDERLESS = 'Genderless',
    UNKNOWN = 'unknown',
};

export type GenderType = (typeof GenderEnum)[keyof typeof GenderEnum];

export enum SpeciesEnum {
    HUMAN = 'Human',
    ALIEN = 'Alien',
    ALL = 'all',
};

export type SpeciesType = (typeof SpeciesEnum)[keyof typeof SpeciesEnum];

export interface CharacterResponse {
    id: string;
    name: string;
    status: StatusType;
    species: SpeciesType;
    type: string;
    gender: GenderType;
    origin: CharacterOrigin;
    location: CharacterLocation;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
}