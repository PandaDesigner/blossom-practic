import { useCallback, useMemo } from 'react';
import { CharacterService } from '../services/CharacterService';
import { env } from '../env';
import { useCharacterStore } from '../store/CharacterStore';
import { CharacterRepositoryFactory } from '../factory/CharacterRepositoryFactory';

/**
 * Hook personalizado para manejar toda la lógica relacionada con los personajes.
 *
 * Esto incluye:
 * - Peticiones de personajes (todos, por nombre o por ID).
 * - Estado global compartido vía Zustand.
 * - Aplicación de filtros (especie, estado, favoritos).
 * - Datos computados (listas filtradas, especies disponibles, etc.).
 */
export const useCharacter = () => {
    // Zustand store
    const {
        allCharacters,
        nameCharacters,
        character,
        loading,
        error,
        characterFilter,
        specieFilter,
        statusFilter,
        searchTerm,
        starredCharacters,
        setAllCharacters,
        setNameCharacters,
        setCharacter,
        setLoading,
        setError,
        setCharacterFilter,
        setSpecieFilter,
        setStatusFilter,
        setSearchTerm,
        toggleStarred,
        clearData,
        clearError,
        clearFilters
    } = useCharacterStore();

    const uri = env.VITE_RICK_AND_MORTY_API_URL;
    const repository = CharacterRepositoryFactory.create(uri);
    const service = useMemo(() => new CharacterService(repository), [repository]);

    /**
     * Obtiene todos los personajes, paginados.
     * @param page Número de página (por defecto 1).
     */
    const fetchAllCharacters = useCallback(async (page: number = 1) => {
        setLoading(true);
        try {
            const data = await service.getAllCharacters(page);
            setAllCharacters(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to fetch all characters');
            }
        } finally {
            setLoading(false);
        }
    }, [service, setAllCharacters, setLoading, setError]);

    /**
     * Busca personajes por nombre.
     * @param name Nombre del personaje.
     * @param page Número de página (por defecto 1).
     */
    const fetchCharactersByName = useCallback(async (name: string, page: number = 1) => {
        if (!name.trim()) {
            setNameCharacters([]);
            return;
        }

        setLoading(true);
        try {
            const character = await service.getCharacterByName(name, page);
            setNameCharacters(character ? [character] : []);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to fetch characters by name');
            }
        } finally {
            setLoading(false);
        }
    }, [service, setNameCharacters, setLoading, setError]);

    /**
     * Obtiene un personaje individual por su ID.
     * @param id ID del personaje.
     */
    const fetchCharacterById = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const data = await service.getCharacterById(id);
            setCharacter(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to fetch character by ID');
            }
        } finally {
            setLoading(false);
        }
    }, [service, setCharacter, setLoading, setError]);

    /**
     * Lista de especies disponibles a partir de los personajes cargados.
     */
    const availableSpecies = useMemo(() => {
        if (!allCharacters?.results) return [];
        const species = [...new Set(allCharacters.results.map(char => char.species))];
        return species.sort();
    }, [allCharacters]);

    /**
     * Lista de estados disponibles a partir de los personajes cargados.
     */
    const availableStatuses = useMemo(() => {
        if (!allCharacters?.results) return [];
        const statuses = [...new Set(allCharacters.results.map(char => char.status))];
        return statuses.sort();
    }, [allCharacters]);

    /**
     * Lista de personajes filtrados según filtros y términos de búsqueda.
     */
    const filteredCharacters = useMemo(() => {
        let characters = allCharacters?.results || [];

        if (searchTerm.trim() && nameCharacters) {
            characters = nameCharacters;
        }

        return characters.filter(char => {
            if (characterFilter === 'starred' && !starredCharacters.includes(char.id)) return false;
            if (characterFilter === 'others' && starredCharacters.includes(char.id)) return false;
            if (specieFilter !== 'all' && char.species !== specieFilter) return false;
            if (statusFilter !== 'all' && char.status !== statusFilter) return false;
            return true;
        });
    }, [allCharacters, nameCharacters, searchTerm, characterFilter, specieFilter, statusFilter, starredCharacters]);

    /**
     * Lista de personajes favoritos según los filtros.
     */
    const starredCharactersList = useMemo(() => {
        return filteredCharacters.filter(char => starredCharacters.includes(char.id));
    }, [filteredCharacters, starredCharacters]);

    /**
     * Lista de personajes no favoritos según los filtros.
     */
    const otherCharactersList = useMemo(() => {
        return filteredCharacters.filter(char => !starredCharacters.includes(char.id));
    }, [filteredCharacters, starredCharacters]);

    return {
        // Estado
        allCharacters,
        nameCharacters,
        character,
        loading,
        error,

        // Filtros
        characterFilter,
        specieFilter,
        statusFilter,
        searchTerm,

        // Favoritos
        starredCharacters,

        // Computados
        availableSpecies,
        availableStatuses,
        filteredCharacters,
        starredCharactersList,
        otherCharactersList,

        // Acciones
        fetchAllCharacters,
        fetchCharactersByName,
        fetchCharacterById,
        setCharacterFilter,
        setSpecieFilter,
        setStatusFilter,
        setSearchTerm,
        toggleStarred,
        clearData,
        clearError,
        clearFilters,

        // Utilidades
        /**
         * Verifica si un personaje está en la lista de favoritos.
         * @param id ID del personaje.
         */
        isStarred: (id: string) => starredCharacters.includes(id),

        /** Verifica si hay personajes cargados */
        hasCharacters: !!allCharacters?.results?.length,

        /** Número total de personajes */
        totalCharacters: allCharacters?.info?.count || 0,

        /** Total de páginas disponibles */
        totalPages: allCharacters?.info?.pages || 0
    };
};
