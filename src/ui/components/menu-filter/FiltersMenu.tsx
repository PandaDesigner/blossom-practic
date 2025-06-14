
import { useCharacter } from '../../../hooks/useCharacter';

interface Props {
    showMenu: boolean;
}

export const FiltersMenu = ({ showMenu }: Props) => {
    const {
        characterFilter,
        specieFilter,
        setCharacterFilter,
        setSpecieFilter,
        availableSpecies,
        clearFilters
    } = useCharacter();

    return (
        <div
            className={`${!showMenu ? 'hidden' : 'block'} w-full transition-all box-border rounded-lg border border-gray-100 grid grid-cols-3 gap-1 bg-white min-h-62 ${!showMenu ? 'top-[-115%]' : 'top-[115%]'} right-0 left-0 absolute p-4 drop-shadow-xl transition-all duration-300 delay-100`}
        >
            <p className='text-sm font-light capitalize 
            text-textPrimary col-span-3 max-h-1'>Character</p>
            <button
                onClick={() => setCharacterFilter('all')}
                className={`text-sm font-light text-textPrimary max-h-12 
                hover:bg-primary-100 border-gray-200 rounded-md border-1 
                transition-all hover:border-primary-100 ${characterFilter === 'all' ? 'bg-primary-100' : ''}`}>Todos
            </button>
            <button
                onClick={() => setCharacterFilter('starred')}
                className={`text-sm font-light text-textPrimary max-h-12 
                hover:bg-primary-100 border-gray-200 rounded-md border-1 
                transition-all hover:border-primary-100 ${characterFilter === 'starred' ? 'bg-primary-100' : ''}`}>Starred
            </button>
            <button
                onClick={() => setCharacterFilter('others')}
                className={`text-sm font-light text-textPrimary max-h-12 
                hover:bg-primary-100 border-gray-200 rounded-md border-1 
                transition-all hover:border-primary-100 ${characterFilter === 'others' ? 'bg-primary-100' : ''}`}>Others
            </button>
            <p className='text-sm font-light capitalize 
            text-textPrimary col-span-3 max-h-1 mt-2'>Especie</p>
            <button
                onClick={() => setSpecieFilter('all')}
                className={`text-sm font-light text-textPrimary max-h-12 
                hover:bg-primary-100 border-gray-200 rounded-md border-1 
                transition-all hover:border-primary-100 ${specieFilter === 'all' ? 'bg-primary-100' : ''}`}>All
            </button>
            {availableSpecies.map((specie) => (
                <button
                    key={specie}
                    onClick={() => setSpecieFilter(specie)}
                    className={`text-sm font-light text-textPrimary max-h-12 
                    hover:bg-primary-100 border-gray-200 rounded-md border-1 
                    transition-all hover:border-primary-100 ${specieFilter === specie ? 'bg-primary-100' : ''}`}>{specie}
                </button>
            ))}

            <button
                onClick={clearFilters}
                className='text-sm font-light text-textPrimary max-h-12 bg-gray-200 
                hover:bg-primary-600/40 border-gray-200 rounded-md border-1 col-span-3
                transition-all mt-4'>Clear Filter
            </button>
        </div>
    )
}
