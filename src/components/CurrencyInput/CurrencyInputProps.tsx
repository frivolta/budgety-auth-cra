import { CurrencyInputProps } from 'react-currency-input-field/dist/components/CurrencyInputProps'

export type CurrencyInputExtendedProps = CurrencyInputProps & {
  label?: string
  hasErrors?: boolean
  errorMessage?: string
}
