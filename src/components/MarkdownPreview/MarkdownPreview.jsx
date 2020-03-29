import React from 'react'

import marked from 'marked'

import { css } from '../../utils/shared'

const MarkdownPreview = ({ input }) => {
  if (!input) return null

  const markdown = marked(input)

  return (
    <div
      {...css`
        margin: 0 auto;
        padding: 0 2rem;
        word-break: break-word;
        @media (max-width: 574px) {
          margin: 0;
          padding: 0 0.5rem;
        }
      `}
      dangerouslySetInnerHTML={{ __html: markdown }}
    ></div>
  )
}

export default MarkdownPreview
