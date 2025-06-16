import type { Character } from './Character';

export interface Info {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface CharactersData {
    info: Info;
    results: Array<Character>;
}

export interface CharacterFilter {
    name?: string;
    status?: 'alive' | 'dead' | 'unknown';
    species?: string;
    type?: string;
    gender?: 'male' | 'female' | 'genderless' | 'unknown';
}

export interface QueryVariables {
    page?: number;
    filter?: CharacterFilter;
}