import React from 'react'
import { render, fireEvent, wait, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import AsyncSearchComponent from './'

test('Should render AsyncSearchComponent', async () => {
  const { getByPlaceholderText, getByRole } = render(
    <AsyncSearchComponent searchTerm={'hooks'} />,
  )

  const input = getByPlaceholderText(/Enter issue title/i)
  const resultsList = getByRole('listbox')
  const arrowButton = getByRole('button')

  fireEvent.click(arrowButton)

  await wait(() => screen.getByText(/You have to enter a search query/i))

  expect(input).toBeInTheDocument()
  expect(resultsList).toBeInTheDocument()
  expect(arrowButton).toBeInTheDocument()
  expect(
    screen.getByText(/You have to enter a search query/i),
  ).toBeInTheDocument()
})
