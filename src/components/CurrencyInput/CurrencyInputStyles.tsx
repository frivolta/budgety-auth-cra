import styled from 'styled-components'
import CurrencyInput from 'react-currency-input-field'

export const StyledCurrencyInput = styled(CurrencyInput)`
  padding: 14px;
  border-radius: ${(props) => props.theme.misc.borderRadius};
  box-shadow: none;

  color: ${(props) => props.theme.colors.darkPrimary};
  outline: none;
  font-weight: 300;

  ::placeholder {
    color: ${(props) => props.theme.colors.darkSecondary};
  }

  :focus {
    border: 1px solid ${(props) => props.theme.colors.primaryColor};
    transition: all 0.5s;
  }
`
