import { IoSearchOutline } from 'react-icons/io5';
import { FilterIcons } from '../../icons/FilterIcons';
import { FiltersMenu } from '../menu-filter/FiltersMenu';
import { useState, useEffect } from 'react';
import { useCharacter } from '../../../hooks/useCharacter';

export const SearchInput = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { setSearchTerm, fetchCharactersByName, searchTerm } = useCharacter();
    const [inputValue, setInputValue] = useState('');

    const handleClick = () => {
        setShowMenu(!showMenu)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue !== searchTerm) {
                setSearchTerm(inputValue);
                fetchCharactersByName(inputValue);
            }
        }, 500); // Debounce de 500ms

        return () => clearTimeout(timer);
    }, [inputValue, fetchCharactersByName, setSearchTerm, searchTerm]);

    return (
        <div className='bg-bgSecondary box-border rounded-md w-full
        transition-all min-w-[315px] max-w-[95%] sm:h-16 sm:max-w-[90%] flex 
        justify-center items-center p-2 relative'>
            <div className='box-border mr-2'>
                <IoSearchOutline size={20} />
            </div>
            <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Search or filter results'
                className='transition-all h-full flex-1 text-[14px] p-1' />
            <div className='p-1 md:p-2 hover:bg-primary-100/40 rounded-md'
                onClick={handleClick}
            >
                <FilterIcons />
            </div>
            <FiltersMenu showMenu={showMenu} />
        </div>
    )
}
