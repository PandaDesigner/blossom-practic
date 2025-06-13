import { create } from 'zustand/react';
import type { Character } from '../domain/character/type/Character';
import type { CharacterFilters } from '../domain/character/type/CharacterFilters';
import { devtools } from 'zustand/middleware';


interface CharacterState {
    //State
    characters: Array<Character>
    loading: boolean;
    error: string | null;
    filters: CharacterFilters;

    //info of Pages
    totalPages: number;
    currentPage: number;
    totalCount: number;

    //Actions
    setCharacters: (characters: Array<Character>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setFilters: (filters: CharacterFilters) => void;
    setPaginationInfo: (info: { totalPages: number; currentPage: number; totalCount: number }) => void;

    //Actions Characters
    toggleFavorite: (characterId: string) => void;

    //Utils
    getFavoriteCharacters: () => Array<Character>;
    getCharacteryId: (id: string) => Character | undefined;
}

export const useCharacterStore = create<CharacterState>()(
    devtools(
        (set, get) => ({
            // State initial
            characters: [],
            loading: false,
            error: null,
            filters: {
                status: 'ALL' as const,
                species: 'ALL' as const,
                gender: 'ALL' as const,
            },
            totalPages: 0,
            currentPage: 1,
            totalCount: 0,

            // Setters Basic
            setCharacters: (characters) => set({ characters }),
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),
            setFilters: (filters) => set({ filters }),
            setPaginationInfo: (info) => set({
                totalPages: info.totalPages,
                totalCount: info.totalCount,
                currentPage: info.currentPage,
            }),

            // Acciones de personajes
            toggleFavorite: (id) =>
                set((state) => ({
                    characters: state.characters.map((character) =>
                        character.id === id
                            ? { ...character, favorite: !character.favorite }
                            : character
                    ),
                })),

            addComment: (id: string, comment: string) =>
                set((state) => ({
                    characters: state.characters.map((character) =>
                        character.id === id
                            ? { ...character, comments: [...character.comments, comment] }
                            : character
                    ),
                })),

            removeComment: (id: string, commentIndex: number) =>
                set((state) => ({
                    characters: state.characters.map((character) =>
                        character.id === id
                            ? {
                                ...character,
                                comments: character.comments.filter((_, index) => index !== commentIndex)
                            }
                            : character
                    ),
                })),

            // Utilidades
            getFavoriteCharacters: () => get().characters.filter(char => char.favorite),
            getCharacterById: (id: string) =>
                get().characters.find(char => char.id === id),
        }),
        {
            name: 'character-store',
        }
    )
);