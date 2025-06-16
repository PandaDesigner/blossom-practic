import { constants } from '../../../constants/content'
import type { Character } from '../../../domain/character/type/Character'
import { useCharacter } from '../../../hooks/useCharacter'
import ItemLists from '../item-lists-starred/ItemLists'
import { ListCharacters } from '../list-characters/ListCharacters'
import ResultActive from '../result-active/ResultActive'
import { SearchInput } from '../search-input/SearchInput'

function MenuNavbar() {
    const { starredCharactersList, otherCharactersList, resultFilterFavorite } = useCharacter()
    return (
        <div className='drawer-container'>
            <div className='drawer-section justify-start items-end py-4 h-16 mt-8'>
                <h1 className='drawer-title'>{constants.TITLE_APP}</h1>
            </div>
            <SearchInput />
            <div className='drawer-section flex-col justify-center py-4'>
                <h2 className='text-[12px] text-textPrimary font-light py-3
                px-1'>
                    {resultFilterFavorite.filterActive
                        ? (<ResultActive
                            countResult={resultFilterFavorite.totalResult}
                            countFilter={resultFilterFavorite.filterApp.length}
                        />)
                        : <span className='uppercase'>
                            {`${constants.STARRED_CHARACTERS} ${starredCharactersList.length}`}</span>}
                </h2>
                <ul className='flex flex-col w-full gap-2'>
                    {starredCharactersList.map((char: { id: string }) => (
                        <ItemLists key={char.id} character={char as Character} />
                    ))}
                </ul>
                <h2 className='text-[12px] text-textPrimary uppercase font-light py-4 
                px-1'>
                    {constants.CHARACTER} ({otherCharactersList.length})
                </h2>
                <ul className='flex flex-col w-full'>
                    {otherCharactersList.map((char: Character) => (
                        <ListCharacters key={char.id} character={char} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MenuNavbar