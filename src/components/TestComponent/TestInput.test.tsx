import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Theme from '../../styles/Theme'
import TestInput from './TestInput'

describe('<TestInput/>', () => {
  it('renders without errors', () => {
    render(
      <Theme>
        <TestInput />
      </Theme>
    )
  })
})
