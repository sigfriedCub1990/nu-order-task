import React, { Suspense } from 'react'
import './App.scss'

import useDebounce from './hooks/useDebounce'
import { DEBOUNCE_DELAY } from './utils/constants'

import LoadingComponent from './components/LoadingComponent'
import MarkdownPreview from './components/MarkdownPreview'

const AsyncSearchComponent = React.lazy(() =>
  import('./components/AsyncSearchComponent'),
)

function App() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY)
  const [issueBody, setIssueBody] = React.useState('')

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

  const handleOnIssueSelect = (input) => setIssueBody(input)

  return (
    <div className="App">
      <Suspense fallback={<LoadingComponent />}>
        <AsyncSearchComponent
          handleOnChange={handleOnChange}
          handleOnIssueSelect={handleOnIssueSelect}
          searchTerm={debouncedSearchTerm}
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
        />
      </Suspense>
      <MarkdownPreview input={issueBody} />
    </div>
  )
}

export default App
