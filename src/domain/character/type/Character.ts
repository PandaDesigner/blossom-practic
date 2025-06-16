export type StatusType = 'Alive' | 'Dead' | 'unknown';

export type GenderType = 'Male' | 'Female' | 'Genderless' | 'unknown';
export interface Character {
    id: string;
    name: string;
    status: StatusType;
    type: string;
    species: string;
    image: string;
    gender: GenderType;
}
