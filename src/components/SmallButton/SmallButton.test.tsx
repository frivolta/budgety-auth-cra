import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { CustomSmallButton } from './SmallButton'
import Theme from '../../styles/Theme'

describe('<CustomSmallButton/>', () => {
  const mockedClick = jest.fn()
  const text = 'Button text'

  it('renders without errors', () => {
    render(
      <Theme>
        <CustomSmallButton handleClick={(e) => mockedClick(e)} text={text} />
      </Theme>
    )
  })

  it('is disabled if has disabled prop and cannot click', () => {
    const { getByTestId } = render(
      <Theme>
        <CustomSmallButton
          handleClick={(e) => mockedClick(e)}
          text={text}
          disabled
        />
      </Theme>
    )
    expect(getByTestId('CustomSmallButton')).toBeDisabled()
    fireEvent.click(getByTestId('CustomSmallButton'))
    expect(mockedClick).toHaveBeenCalledTimes(0)
  })

  it('calls an action on click', () => {
    const { getByTestId } = render(
      <Theme>
        <CustomSmallButton handleClick={(e) => mockedClick(e)} text={text} />
      </Theme>
    )
    fireEvent.click(getByTestId('CustomSmallButton'))
    expect(mockedClick).toHaveBeenCalledTimes(1)
  })
})
