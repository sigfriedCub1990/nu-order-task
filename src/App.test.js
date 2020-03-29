import React from 'react'
import { render, wait, screen } from '@testing-library/react'
import App from './App'

test('Renders main app', async () => {
  render(<App />)

  await wait(() => screen.getByText(/Search an issue/i))

  expect(screen.getByText(/Search an issue/i)).toBeInTheDocument()
})
