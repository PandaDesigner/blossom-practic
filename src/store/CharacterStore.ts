// src/store/characterStore.ts
import { create } from 'zustand';
import type { Character } from '../domain/character/type/Character';
import type { CharactersData } from '../domain/character/type/CharacterResponse';

/**
 * Tipo de filtro para personajes destacados o no.
 */
type CharacterFilter = 'all' | 'starred' | 'others';

/**
 * Tipo de filtro para especies. Por defecto 'all'.
 */
type SpecieFilter = 'all' | string;

/**
 * Tipo de filtro para estado de personajes.
 */
type StatusFilter = 'all' | 'Alive' | 'Dead' | 'unknown';

/**
 * Estado y acciones del store de personajes.
 */
interface CharacterState {
    // Datos
    /** Todos los personajes obtenidos del endpoint principal */
    allCharacters: CharactersData | null;
    /** Personajes filtrados por nombre */
    nameCharacters: Character[] | null;
    /** Detalle de un personaje individual */
    character: Character | null;

    // Estado de UI
    /** Bandera de carga para operaciones asíncronas */
    loading: boolean;
    /** Error que ocurrió durante una operación */
    error: string | null;

    // Filtros
    /** Filtro de personajes: todos, destacados o no destacados */
    characterFilter: CharacterFilter;
    /** Filtro por especie */
    specieFilter: SpecieFilter;
    /** Filtro por estado */
    statusFilter: StatusFilter;
    /** Término de búsqueda por nombre */
    searchTerm: string;

    // Favoritos
    /** Lista de IDs de personajes destacados */
    starredCharacters: string[];

    // Acciones de datos
    /**
     * Establece todos los personajes.
     * @param data - Objeto con la información de personajes.
     */
    setAllCharacters: (data: CharactersData) => void;

    /**
     * Establece los personajes filtrados por nombre.
     * @param data - Lista de personajes.
     */
    setNameCharacters: (data: Character[]) => void;

    /**
     * Establece un personaje individual.
     * @param data - Detalle del personaje.
     */
    setCharacter: (data: Character | null) => void;

    // Acciones de UI
    /**
     * Cambia el estado de carga.
     * @param loading - Valor booleano.
     */
    setLoading: (loading: boolean) => void;

    /**
     * Establece un mensaje de error.
     * @param error - Texto del error.
     */
    setError: (error: string | null) => void;

    /** Limpia cualquier mensaje de error */
    clearError: () => void;

    // Acciones de filtros
    /**
     * Establece el filtro de personajes.
     * @param filter - Filtro seleccionado.
     */
    setCharacterFilter: (filter: CharacterFilter) => void;

    /**
     * Establece el filtro de especie.
     * @param filter - Especie seleccionada.
     */
    setSpecieFilter: (filter: SpecieFilter) => void;

    /**
     * Establece el filtro de estado.
     * @param filter - Estado seleccionado.
     */
    setStatusFilter: (filter: StatusFilter) => void;

    /**
     * Establece el término de búsqueda.
     * @param term - Texto de búsqueda.
     */
    setSearchTerm: (term: string) => void;

    // Acciones de favoritos
    /**
     * Agrega o elimina un personaje de los destacados.
     * @param id - ID del personaje.
     */
    toggleStarred: (id: string) => void;

    // Acciones de limpieza
    /** Limpia todos los datos de personajes */
    clearData: () => void;

    /** Restablece todos los filtros a sus valores por defecto */
    clearFilters: () => void;
}

/**
 * Hook Zustand para manejar el estado global de personajes.
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
