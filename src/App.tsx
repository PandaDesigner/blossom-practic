import { ProviderApollo } from './adapter/apolloProvider/ProviderApollo'
import { useCharacter } from './hooks/useCharacter'
import { useEffect } from 'react'
import CharacterDetailPage from './pages/CharacterDetailPage'
import MenuNavbar from './ui/components/menu-navbar/MenuNavbar'

function App() {
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
    <>
      <ProviderApollo>
        <div>
          <div className='container'>
            <MenuNavbar />
            <div className='content-container flex-1'>
              <CharacterDetailPage />
            </div>
          </div>
        </div>
      </ProviderApollo>
    </>
  )
}

export default App
