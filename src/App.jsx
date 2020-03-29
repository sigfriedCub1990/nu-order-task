import React, { Suspense } from 'react'
import './App.css'

import useDebounce from './hooks/useDebounce'

import { DEBOUNCE_DELAY } from './utils/constants'

const AsyncSearchComponent = React.lazy(() =>
  import('./components/AsyncSearchComponent'),
)

function App() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY)

  const handleOnChange = ({ target }) => {
    const { value } = target
    setSearchTerm(value)
  }

  const changeCurrentPage = (direction) => {
    if (direction === -1) {
      setCurrentPage(currentPage - 1)
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncSearchComponent
          handleOnChange={handleOnChange}
          searchTerm={debouncedSearchTerm}
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
        />
      </Suspense>
    </div>
  )
}

export default App
