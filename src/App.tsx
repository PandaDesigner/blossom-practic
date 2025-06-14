import { ProviderApollo } from './adapter/apolloProvider/ProviderApollo'
import ItemLists from './ui/components/item-lists-starred/ItemLists'
import { SearchInput } from './ui/components/search-input/SearchInput'
import { ListCharacters } from './ui/components/list-characters/ListCharacters'
import { useCharacter } from './hooks/useCharacter'
import { useEffect } from 'react'
import CharacterDetailPage from './pages/CharacterDetailPage'

function App() {
  const {
    fetchAllCharacters,
    starredCharactersList,
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
            <div className='drawer-container'>
              <div className='drawer-section justify-start items-end py-4 h-16 mt-8'>
                <h1 className='drawer-title'>Rick and Morty list</h1>
              </div>
              <SearchInput />
              <div className='drawer-section flex-col justify-center py-4'>
                <h2 className='text-[12px] text-textPrimary uppercase font-light py-3
                px-1'>
                  Starred Characters ({starredCharactersList.length})
                </h2>
                <ul className='flex flex-col w-full gap-2'>
                  {starredCharactersList.map(char => (
                    <ItemLists key={char.id} character={char} />
                  ))}
                </ul>
                <h2 className='text-[12px] text-textPrimary uppercase font-light py-4 
                px-1'>
                  Characters ({otherCharactersList.length})
                </h2>
                <ul className='flex flex-col w-full'>
                  {otherCharactersList.map(char => (
                    <ListCharacters key={char.id} character={char} />
                  ))}
                </ul>
              </div>
            </div>
            <div className='content-container flex-1'>
              {character && (
                <CharacterDetailPage
                  character={character}
                />
              )}
            </div>
          </div>
        </div>
      </ProviderApollo>
    </>
  )
}

export default App
