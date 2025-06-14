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
        error
    } = useCharacter();

    useEffect(() => {
        fetchAllCharacters();
    }, [fetchAllCharacters]);

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
