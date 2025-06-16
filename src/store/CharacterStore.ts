// src/store/characterStore.ts
import { create } from 'zustand';
import type { Character } from '../domain/character/type/Character';
import type { CharactersData } from '../domain/character/type/CharacterResponse';

/**
 * Filter type for starred or non-starred characters.
 */
export type CharacterFilter = 'all' | 'starred' | 'others';

/**
 * Filter type for species. Defaults to 'all'.
 */
export type SpecieFilter = 'all' | string;

/**
 * Filter type for character status.
 */
export type StatusFilter = 'all' | 'Alive' | 'Dead' | 'unknown';

/**
 * Character store state and actions.
 */
interface CharacterState {
    // Data
    /** All characters fetched from main endpoint */
    allCharacters: CharactersData | null;
    /** Characters filtered by name */
    nameCharacters: Character[] | null;
    /** Individual character detail */
    character: Character | null;

    // UI State
    /** Loading flag for async operations */
    loading: boolean;
    /** Error that occurred during operation */
    error: string | null;

    // Filters
    /** Character filter: all, starred or non-starred */
    characterFilter: CharacterFilter;
    /** Species filter */
    specieFilter: SpecieFilter;
    /** Status filter */
    statusFilter: StatusFilter;
    /** Name search term */
    searchTerm: string;

    // Favorites
    /** List of starred character IDs */
    starredCharacters: string[];

    // Data Actions
    /**
     * Sets all characters.
     * @param data - Object with characters information.
     */
    setAllCharacters: (data: CharactersData) => void;

    /**
     * Sets name-filtered characters.
     * @param data - List of characters.
     */
    setNameCharacters: (data: Character[]) => void;

    /**
     * Sets individual character.
     * @param data - Character detail.
     */
    setCharacter: (data: Character | null) => void;

    // UI Actions
    /**
     * Changes loading state.
     * @param loading - Boolean value.
     */
    setLoading: (loading: boolean) => void;

    /**
     * Sets error message.
     * @param error - Error text.
     */
    setError: (error: string | null) => void;

    /** Clears any error message */
    clearError: () => void;

    // Filter Actions
    /**
     * Sets character filter.
     * @param filter - Selected filter.
     */
    setCharacterFilter: (filter: CharacterFilter) => void;

    /**
     * Sets species filter.
     * @param filter - Selected species.
     */
    setSpecieFilter: (filter: SpecieFilter) => void;

    /**
     * Sets status filter.
     * @param filter - Selected status.
     */
    setStatusFilter: (filter: StatusFilter) => void;

    /**
     * Sets search term.
     * @param term - Search text.
     */
    setSearchTerm: (term: string) => void;

    // Favorite Actions
    /**
     * Adds or removes a character from starred list.
     * @param id - Character ID.
     */
    toggleStarred: (id: string) => void;

    // Cleanup Actions
    /** Clears all character data */
    clearData: () => void;

    /** Resets all filters to default values */
    clearFilters: () => void;
}

/**
 * Zustand hook to manage global character state.
 */
export const useCharacterStore = create<CharacterState>((set) => ({
    allCharacters: null,
    nameCharacters: null,
    character: null,
    loading: false,
    error: null,
    characterFilter: 'all',
    specieFilter: 'all',
    statusFilter: 'all',
    searchTerm: '',
    starredCharacters: [],

    setAllCharacters: (data) => set({ allCharacters: data, loading: false, error: null }),
    setNameCharacters: (data) => set({ nameCharacters: data, loading: false, error: null }),
    setCharacter: (data) => set({ character: data, loading: false, error: null }),

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error, loading: false }),
    clearError: () => set({ error: null }),

    setCharacterFilter: (filter) => set({ characterFilter: filter }),
    setSpecieFilter: (filter) => set({ specieFilter: filter }),
    setStatusFilter: (filter) => set({ statusFilter: filter }),
    setSearchTerm: (term) => set({ searchTerm: term }),

    toggleStarred: (id) => set((state) => ({
        starredCharacters: state.starredCharacters.includes(id)
            ? state.starredCharacters.filter(starredId => starredId !== id)
            : [...state.starredCharacters, id]
    })),

    clearData: () => set({
        allCharacters: null,
        nameCharacters: null,
        character: null,
        loading: false,
        error: null
    }),

    clearFilters: () => set({
        characterFilter: 'all',
        specieFilter: 'all',
        statusFilter: 'all',
        searchTerm: ''
    })
}));
