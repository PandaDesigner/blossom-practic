import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { ProviderApollo } from './adapter/apolloProvider/ProviderApollo'
import ItemLists from './ui/components/item-lists-starred/ItemLists'

import { SearchInput } from './ui/components/search-input/SearchInput'
import { ListCharacters } from './ui/components/list-characters/ListCharacters';

function App() {
  const hearth = true;

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
                  Starred Characters (2)
                </h2>
                <ul className='flex flex-col w-full'>
                  <ItemLists />
                  <ItemLists />
                </ul>
                <h2 className='text-[12px] text-textPrimary uppercase font-light py-4 
                px-1'>
                  Characters (4)
                </h2>
                <ul className='flex flex-col w-full'>
                  <ListCharacters />
                  <ListCharacters />
                  <ListCharacters />
                  <ListCharacters />
                </ul>
              </div>
            </div>
            <div
              className='content-container flex-1'>
              <div className='p-4 flex flex-col justify-center
              items-start w-full max-w-[90%] mt-8'>
                <div className='relative'>
                  <div className='h-19 w-19 rounded-full bg-primary-600' />
                  <div className='h-8 w-8 bg-white rounded-full
                  flex justify-center items-center cursor-pointer 
                  absolute bottom-[2px] right-[-8px]'
                  >
                    {hearth
                      ? <FaHeart className='text-secondary-600 h-5 w-5' />
                      : <FaRegHeart className='text-gray-300 h-5 w-5' />
                    }
                  </div>
                </div>
                <h2 className='text-2xl font-bold py-2'> Abadango Cluster Princess </h2>
              </div>
              <ul className='w-full max-w-[90%] px-6'>
                <li className='py-4 border-b-1 border-textPrimary/20'>
                  <h3 className='text-textPrimary font-bold'>Specie</h3>
                  <p>Alien</p>
                </li>
                <li className='py-4 border-b-1 border-textPrimary/20'>
                  <h3 className='text-textPrimary font-bold'>Status</h3>
                  <p>Alive</p>
                </li>
                <li className='py-4 border-b-1 border-textPrimary/20'>
                  <h3 className='text-textPrimary font-bold'>Occupation</h3>
                  <p>Princess</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ProviderApollo>
    </>
  )
}

export default App
