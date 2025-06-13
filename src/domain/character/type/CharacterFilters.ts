export const CharacterStatusEnum = {
    ALL: 'ALL',
    ALIVE: 'Alive',
    DEAD: 'Dead',
    UNKNOWN: 'unknown',
} as const;

export type CharacterStatusEnum = (typeof CharacterStatusEnum)[keyof typeof CharacterStatusEnum];

export const CharacterGenderEnum = {
    ALL: 'ALL',
    FEMALE: 'Female',
    MALE: 'Male',
    GENDERLESS: 'Genderless',
    UNKNOWN: 'unknown',
} as const;

export type CharacterGenderEnum = (typeof CharacterGenderEnum)[keyof typeof CharacterGenderEnum];

export const SpeciesEnum = {
    ALL: 'ALL',
    HUMAN: 'Human',
    ALIEN: 'Alien',
} as const;

export type SpeciesEnum = (typeof SpeciesEnum)[keyof typeof SpeciesEnum];

export interface CharacterFilters {
    name?: string;
    status: CharacterStatusEnum;
    species: SpeciesEnum;
    type?: string;
    gender: CharacterGenderEnum;
}

export type ActiveFilters = {
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
};