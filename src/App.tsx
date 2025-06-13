import { ProviderApollo } from './adapter/apolloProvider/ProviderApollo'
import { SearchInput } from './ui/components/search-input/SearchInput'

function App() {

  return (
    <>
      <ProviderApollo>
        <div>
          <div className='container'>
            <div className='drawer-container'>
              <div className='drawer-section h-16'>
                <h1 className='drawer-title'>Rick and Morty list</h1>
              </div>
              <SearchInput />
              <div className='drawer-section'>
                <h2 className='text-[12px] text-textPrimary uppercase font-light py-1'>
                  Starred Characters (2)
                </h2>
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
