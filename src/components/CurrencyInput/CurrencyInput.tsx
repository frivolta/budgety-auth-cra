import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react'
import { CurrencyInputProps } from './CurrencyInputProps'
import {
  CurrencyInputField,
  InputContainer,
  InputLabel,
  InputError,
} from '../Input/sharedInputStyles'
import {
  checkIsValidNumber,
  cleanValue,
  formatValue,
  padTrimValue,
} from './utils/currency.utils'

export const CurrencyInput: FC<CurrencyInputProps> = ({
  allowDecimals = true,
  id,
  name,
  className,
  decimalsLimit = 2,
  defaultValue,
  disabled = false,
  value,
  onChange,
  placeholder,
  precision,
  prefix,
  maxLength,
  ...props
}: CurrencyInputProps) => {
  const _defaultValue = defaultValue
    ? formatValue(String(defaultValue), prefix)
    : formatValue('0', prefix)
  const [stateValue, setStateValue] = useState(_defaultValue)
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const onFocus = (): number => (stateValue ? stateValue.length : 0)

  const processChange = ({ target: { selectionStart, value } }: any): void => {
    const valueOnly = cleanValue(value, allowDecimals, decimalsLimit, prefix)

    if (!valueOnly) {
      onChange && onChange(undefined, name)
      return setStateValue('')
    }

    if (checkIsValidNumber(valueOnly)) {
      const formattedValue = formatValue(valueOnly, prefix)
      if (selectionStart) {
        const cursor =
          selectionStart + (formattedValue.length - value.length) || 1
        setCursor(cursor)
      }
      setStateValue(formattedValue)
    }

    onChange && onChange(valueOnly, name)
  }

  const handleOnBlur = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue(value, allowDecimals, decimalsLimit, prefix)
    const newValue = padTrimValue(valueOnly, precision)
    const formattedValue = formatValue(newValue, prefix)
    setStateValue(formattedValue)
    onChange && onChange(newValue, name)
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setSelectionRange(cursor, cursor)
    }
  }, [cursor, inputRef, stateValue])

  const formattedPropsValue = value
    ? formatValue(String(value), prefix)
    : undefined

  return (
    <InputContainer>
      {props.label && <InputLabel htmlFor={name}>{props.label} </InputLabel>}
      <CurrencyInputField
        type="text"
        inputMode="decimal"
        id={id}
        name={name}
        className={className}
        onChange={processChange}
        onBlur={handleOnBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        value={formattedPropsValue || stateValue}
        ref={inputRef}
        maxLength={maxLength}
        {...props}
      />
      {props.hasErrors && (
        <InputError data-testid="InputError">{props.errorMessage}</InputError>
      )}
    </InputContainer>
  )
}

export default CurrencyInput
