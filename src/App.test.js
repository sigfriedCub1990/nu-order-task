import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders search an issue label', () => {
  const { getByText } = render(<App />)
  const label = getByText(/Search an issue/i)
  expect(label).toBeInTheDocument()
})
