import { IoSearchOutline } from 'react-icons/io5';
import { FilterIcons } from '../../icons/FilterIcons';

export const SearchInput = () => {
    return (
        <div className='bg-bgSecondary  rounded-md w-full
         transition-all min-w-[315px] max-w-[95%] sm:h-16 sm:max-w-[90%] flex justify-center items-center p-2'>
            <div className='box-border mr-2'>
                <IoSearchOutline size={20} />
            </div>
            <input type='text'
                placeholder='Search or filter results'
                className='transition-all h-full flex-1 text-[14px] p-1' />
            <div>
                <FilterIcons />
            </div>
        </div>
    )
}
