import React from 'react'
import {
  InputProps,
  InputContainer,
  InputLabel,
  InputField,
  InputError,
} from './sharedInputStyles'

export const Input: React.FC<InputProps> = (props) => {
  return (
    <InputContainer>
      {props.label && (
        <InputLabel htmlFor={props.name}>{props.label} </InputLabel>
      )}
      <InputField
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        placeholder={props.placeholder}
        disabled={props.disabled ? props.disabled : false}
        data-testid="Input"
        hasErrors={props.hasErrors}
      />
      {props.hasErrors && (
        <InputError data-testid="InputError">{props.errorMessage}</InputError>
      )}
    </InputContainer>
  )
}
