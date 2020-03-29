import { getRequest } from './fetch-api'

class IssuesApiService {
  static async getIssues(searchTerm, currentPage) {
    try {
      return await getRequest('issues', {
        searchParams: `?q=${searchTerm}+repo:facebook/react&page=${currentPage}`,
      }).json()
    } catch (err) {
      console.log(err)
    }
  }
}

export default IssuesApiService
