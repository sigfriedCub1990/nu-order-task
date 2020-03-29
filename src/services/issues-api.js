import { getRequest } from './fetch-api'

class IssuesApiService {
  /**
   * Get issues from facebook/react repository
   * @param {String} key - This key belongs to react-query
   * @param {String} searchTerm - Search time to search inside repo's issues
   * @param {Number} currentPage - Current page in order to be able to paginate
   *
   * @return {Promise}
   *
   */
  static async getIssues(key, searchTerm, currentPage) {
    try {
      return await getRequest('issues', {
        searchParams: `?q=${searchTerm}+repo:facebook/react&page=${currentPage}`,
      }).json()
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default IssuesApiService
