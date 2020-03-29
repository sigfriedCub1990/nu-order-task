import ky from 'ky'

import API_ROOT_PATH from '../utils/constants'

const FetchApiService = ky.extend({
  headers: {
    Accept: 'application/vnd.github.v3.text-match+json',
  },
  prefixUrl: API_ROOT_PATH,
  retry: 0,
})

export const {
  delete: deleteRequest,
  get: getRequest,
  post: postRequest,
  put: putRequest,
} = FetchApiService
