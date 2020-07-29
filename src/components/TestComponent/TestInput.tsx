import React, { useState, useRef } from 'react'
import {
  cleanValue,
  checkIsValidNumber,
  formatValue,
  padTrimValue,
} from './TestInput.utils'

const PREFIX = '€'

const TestInput = () => {
  const [stateValue, setStateValue] = useState('0')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { selectionStart, value } = event.target

    // Initial number processing
    const valueOnly = cleanValue(value, true, 2, PREFIX)
    if (!valueOnly) {
      return setStateValue('')
    }

    // Format value and set caret
    if (checkIsValidNumber(valueOnly)) {
      const formattedValue = formatValue(valueOnly, PREFIX)
      if (selectionStart) {
        const cursor =
          selectionStart + (formattedValue.length - value.length) || 1
        setCursor(cursor)
      }
      setStateValue(formattedValue)
      console.log(formattedValue)
    }
    //OnChange callback
  }

  // Trim number and add decimals on blur
  const handleOnBlur = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue(value, true, 2, PREFIX)
    const newValue = padTrimValue(valueOnly, 2)
    const formattedValue = formatValue(newValue, PREFIX)
    setStateValue(formattedValue)
    //OnChange callback
  }

  React.useEffect(() => {
    // Avoid cursor to go at the end of the number
    if (inputRef && inputRef.current) {
      inputRef.current.setSelectionRange(cursor, cursor)
    }
  }, [cursor, inputRef, stateValue])

  return (
    <input
      value={stateValue}
      onChange={(event) => handleInputChange(event)}
      onBlur={(event) => handleOnBlur(event)}
      ref={inputRef}
    />
  )
}

export default TestInput
