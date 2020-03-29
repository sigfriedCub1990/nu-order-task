import { useQuery } from 'react-query'

import IssuesApiService from '../../services/issues-api'

const ResultsComponent = ({ searchTerm, currentPage = 1, children }) => {
  const { status, data, error } = useQuery(
    searchTerm && ['issues', searchTerm, currentPage],
    IssuesApiService.getIssues,
  )

  return children({ data, error, status })
}

export default ResultsComponent
