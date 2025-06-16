import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProviderApollo } from '../adapter/apolloProvider/ProviderApollo'
import MenuNavbar from '../ui/components/menu-navbar/MenuNavbar'
import HomePage from '../pages/HomePage'
import { useCharacter } from '../hooks/useCharacter';
import { useEffect } from 'react';
import CharacterDetailPage from '../pages/CharacterDetailPage';


function RouterPage() {

    const {
        fetchAllCharacters,
        otherCharactersList,
        character,
        fetchCharacterById,
        loading,
        error,
    } = useCharacter();

    /**
     * This useEffect hook is responsible for fetching all characters when
     * the component mounts.
     * It only executes when the reference to the fetchAllCharacters function
     * changes.
     * An empty dependency array would cause it to run only once on mount,
     * but since fetchAllCharacters is included in the dependencies, it will
     * re-run if that function changes.
     */

    useEffect(() => {
        fetchAllCharacters();
    }, [fetchAllCharacters]);

    /**
     * Automatically selects the first character when no character is selected.
     * 
     * This effect runs under two conditions:
     * 1. No character is currently selected (!character)
     * 2. The otherCharactersList contains at least one character
     * 
     * When these conditions are met, it calls fetchCharacterById with the ID
     * of the first character in the list, providing a default selection.
     * 
     * Dependencies:
     * - character: The currently selected character
     * - otherCharactersList: The list of available characters
     * - fetchCharacterById: Function to fetch a character by ID
     */
    useEffect(() => {
        if (!character && otherCharactersList.length > 0) {
            fetchCharacterById(otherCharactersList[0].id);
        }
    }, [character, otherCharactersList, fetchCharacterById]);

    if (loading && !character) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <ProviderApollo>
            <BrowserRouter>
                <div>
                    <div className='container'>
                        <MenuNavbar />
                        <div className='content-container flex-1'>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/character/:id"
                                    element={<CharacterDetailPage />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </ProviderApollo>
    )
}

export default RouterPage
