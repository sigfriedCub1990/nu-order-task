import React from 'react'
import './App.css'

import AsyncSearchComponent from './components/AsyncSearchComponent'

import useDebounce from './hooks/useDebounce'
const DEBOUNCE_DELAY = 500

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
      <AsyncSearchComponent
        handleOnChange={handleOnChange}
        searchTerm={debouncedSearchTerm}
        currentPage={currentPage}
        changeCurrentPage={changeCurrentPage}
      />
    </div>
  )
}

export default App
