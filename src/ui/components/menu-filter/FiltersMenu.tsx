import { useEffect, useState } from 'react';
import { useCharacter } from '../../../hooks/useCharacter';
import type { CharacterFilter, SpecieFilter } from '../../../store/CharacterStore';
import { constants } from '../../../constants/content';
interface Props {
    showMenu: boolean;
    handleClick: () => void;
}

interface SpecieState {
    characterFilter: CharacterFilter;
    specieFilter: SpecieFilter;

}

export const FiltersMenu = ({ showMenu, handleClick }: Props) => {

    const [filter, setFilter] = useState<SpecieState>({
        characterFilter: 'all',
        specieFilter: 'all'
    });

    const {
        characterFilter,
        specieFilter,
        setCharacterFilter,
        setSpecieFilter,
        availableSpecies,
    } = useCharacter();

    useEffect(() => {
        setFilter({
            characterFilter: characterFilter,
            specieFilter: (specieFilter as unknown) as SpecieFilter
        });
    }, [characterFilter, specieFilter])

    const handlerFilter = () => {
        setCharacterFilter(filter.characterFilter);
        setSpecieFilter((filter.specieFilter as unknown) as string);
        handleClick();
    }

    return (
        <div
            className={`${!showMenu ? 'hidden' : 'block'} w-full transition-all box-border rounded-lg border border-gray-100 grid grid-cols-3 gap-1 bg-white min-h-62 ${!showMenu ? 'top-[-115%]' : 'top-[115%]'} right-0 left-0 absolute p-4 drop-shadow-xl transition-all duration-300 delay-100`}
        >
            <p className='text-sm font-light capitalize 
            text-textPrimary col-span-3 max-h-1'>{constants.CHARACTER}</p>
            <button
                onClick={() => setFilter(prev => ({
                    ...prev,
                    characterFilter: 'all'
                }))}
                className={`text-sm font-light text-textPrimary max-h-12 
                hover:bg-primary-100 border-gray-200 rounded-md border-1 
                transition-all hover:border-primary-100 ${filter.characterFilter === 'all' ? 'bg-primary-100' : ''}`}>{constants.ALL_FILTER}
            </button>
            <button
                onClick={() => setFilter(prev => ({
                    ...prev,
                    characterFilter: 'starred'
                }))}
                className={`text-sm font-light text-textPrimary max-h-12 
                hover:bg-primary-100 border-gray-200 rounded-md border-1 
                transition-all hover:border-primary-100 ${filter.characterFilter === 'starred' ? 'bg-primary-100' : ''}`}>{constants.STARRED}
            </button>
            <button
                onClick={() => setFilter((prev) => ({
                    ...prev,
                    characterFilter: 'others'
                }))}
                className={`text-sm font-light text-textPrimary max-h-12 
                hover:bg-primary-100 border-gray-200 rounded-md border-1 
                transition-all hover:border-primary-100 ${filter.characterFilter === 'others' ? 'bg-primary-100' : ''}`}>{constants.OTHERS}
            </button>
            <p className='text-sm font-light capitalize 
            text-textPrimary col-span-3 max-h-1 mt-2'>{constants.SPECIES}</p>
            <button
                onClick={() => setFilter(prev => ({
                    ...prev,
                    specieFilter: ('all' as unknown) as SpecieFilter
                }))}
                className={`text-sm font-light text-textPrimary max-h-12 
                hover:bg-primary-100 border-gray-200 rounded-md border-1 
                transition-all hover:border-primary-100 ${filter.specieFilter.toString() === 'all'
                        ? 'bg-primary-100'
                        : ''}`}>All
            </button>
            {availableSpecies.map((specie) => (
                <button
                    key={String(specie)}
                    onClick={() => setFilter(prev => ({
                        ...prev,
                        specieFilter: (specie as unknown) as SpecieFilter
                    }))}
                    className={`text-sm font-light text-textPrimary max-h-12 
                    hover:bg-primary-100 border-gray-200 rounded-md border-1 
                    transition-all hover:border-primary-100 ${filter.specieFilter.toString() === specie
                            ? 'bg-primary-100 text-primary-700 border-primary-100'
                            : ''}`}>{String(specie)}
                </button>
            ))}
            <button
                onClick={handlerFilter}
                className='text-sm font-light text-textPrimary max-h-12 bg-gray-200 
                hover:bg-primary-600 hover:text-white border-gray-200 rounded-md border-1 col-span-3
                transition-all mt-4'>
                {constants.FILTER}
            </button>
        </div>
    )
}
