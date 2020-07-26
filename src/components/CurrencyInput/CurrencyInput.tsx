import React from 'react'
import { StyledCurrencyInput } from './CurrencyInputStyles'
import { CurrencyInputExtendedProps } from './CurrencyInputProps'
import {
  InputContainer,
  InputLabel,
  InputError,
} from '../Input/sharedInputStyles'

const CurrencyInput: React.FC<CurrencyInputExtendedProps> = ({
  placeholder = '0',
  value,
  onChange,
  onBlur,
  label,
  name,
  hasErrors,
  errorMessage,
  defaultValue,
}) => {
  return (
    <InputContainer>
      {label && <InputLabel htmlFor={name}>{label} </InputLabel>}
      <StyledCurrencyInput
        name="monthlyBudget"
        placeholder={placeholder}
        defaultValue={defaultValue}
        allowDecimals={true}
        decimalsLimit={2}
        onChange={onChange}
        onBlur={onBlur}
        prefix="€ "
        value={value}
      />
      {hasErrors && (
        <InputError data-testid="InputError">{errorMessage}</InputError>
      )}
    </InputContainer>
  )
}

export default CurrencyInput
