import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import MarkdownPreview from './'

test('Should render MarkdownPreview', async () => {
  const { getByText } = render(<MarkdownPreview input={'## The problem'} />)

  const documentTitle = getByText(/problem/i)

  expect(documentTitle).toBeInTheDocument()
})
