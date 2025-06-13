import { ProviderApollo } from './adapter/apolloProvider/ProviderApollo'

function App() {


  return (
    <>
      <ProviderApollo>
        <div>
          <h1 className='text-indigo-500 text-3xl font-bold'>
            Welcome to your interview test.
          </h1>
        </div>
      </ProviderApollo>
    </>
  )
}

export default App
