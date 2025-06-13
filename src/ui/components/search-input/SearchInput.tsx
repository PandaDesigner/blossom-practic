import { IoSearchOutline } from 'react-icons/io5';
import { FilterIcons } from '../../icons/FilterIcons';
import { FiltersMenu } from '../menu-filter/FiltersMenu';
import { useState } from 'react';

export const SearchInput = () => {
    const [showMenu, setShowMenu] = useState(false);
    const handleClick = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className='bg-bgSecondary box-border rounded-md w-full
        transition-all min-w-[315px] max-w-[95%] sm:h-16 sm:max-w-[90%] flex 
        justify-center items-center p-2 relative'>
            <div className='box-border mr-2'>
                <IoSearchOutline size={20} />
            </div>
            <input type='text'
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
