import IssuesApiService from './issues-api'

import { getRequest } from './fetch-api'

jest.mock('./fetch-api')

const requestParams = {
  searchParams: '?q=batching+repo:facebook/react&page=1',
}

it('Should call API with correct parameters', async () => {
  getRequest.mockImplementation(() => {
    return {
      json: jest.fn(() => Promise.resolve({})),
    }
  })

  await IssuesApiService.getIssues('issues', 'batching', 1)

  expect(getRequest).toHaveBeenCalledTimes(1)
  expect(getRequest).toHaveBeenCalledWith('issues', requestParams)
})

it('Should gracefully recover from an error', async () => {
  getRequest.mockImplementation(() => {
    return {
      json: jest.fn(() => {
        const error = new Error('Unable to communicate with server')

        return Promise.reject(error)
      }),
    }
  })

  await expect(
    IssuesApiService.getIssues('issues', 'batching', 1),
  ).rejects.toThrow('Unable to communicate with server')
})
