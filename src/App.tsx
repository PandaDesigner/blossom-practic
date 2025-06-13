import { ProviderApollo } from './adapter/apolloProvider/ProviderApollo'
import ItemLists from './ui/components/item-lists-starred/ItemLists'
import { ListCharacters } from './ui/components/list-characters/listCharacters'
import { SearchInput } from './ui/components/search-input/SearchInput'


function App() {

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
              className='content-container'></div>
          </div>
        </div>
      </ProviderApollo>
    </>
  )
}

export default App
