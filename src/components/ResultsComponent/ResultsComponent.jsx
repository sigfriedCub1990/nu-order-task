import React from 'react'

import IssuesApiService from '../../services/issues-api'

const ResultsComponent = ({ searchTerm, currentPage = 1, children }) => {
  const [results, setResults] = React.useState({ items: [] })
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    if (searchTerm) {
      const search = async () => {
        try {
          setLoading(true)
          const results = await IssuesApiService.getIssues(
            searchTerm,
            currentPage,
          )
          setResults(results)
          setLoading(false)
        } catch (err) {
          setError(err.message)
        }
      }
      search(searchTerm)
    }
  }, [searchTerm, currentPage])

  return results ? children({ data: results, error, loading }) : null
}

export default ResultsComponent
