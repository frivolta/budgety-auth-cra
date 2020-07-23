import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Card from '../Card/Card'
import CardContainer from '../Card/CardContainer'
import { Input } from '../Input/Input'
import { CurrencyInput } from '../CurrencyInput/CurrencyInput'

storiesOf('Components', module).add('Input', () => (
  <Card customWidth={50}>
    <CardContainer>
      <Input
        placeholder="Default input"
        type="text"
        name="default-input"
        handleChange={action('change')}
        handleBlur={action('blur')}
        label="Default input"
      />
      <Input
        placeholder="Error input"
        type="text"
        name="error-input"
        handleChange={action('change')}
        handleBlur={action('blur')}
        label="Error Input"
        hasErrors={true}
        errorMessage="Error message"
      />
      <Input
        placeholder="Disabled input"
        type="text"
        name="disabled-input"
        handleChange={action('change')}
        handleBlur={action('blur')}
        label="Disabled input"
        disabled={true}
      />
      <Input
        placeholder="Password input"
        type="password"
        name="password-input"
        handleChange={action('change')}
        handleBlur={action('blur')}
        label="Password input"
      />
      <CurrencyInput
        label="Currency"
        name="currency"
        hasErrors={false}
        prefix="€"
        allowDecimals
        defaultValue={0}
        decimalsLimit={2}
        maxLength={10}
        onChange={action('change')}
      />
      <CurrencyInput
        label="Currency with errors"
        name="currency-errors"
        hasErrors
        errorMessage="Invalid currency"
        prefix="€"
        allowDecimals
        defaultValue={0}
        decimalsLimit={2}
        maxLength={10}
        onChange={action('change')}
      />
      <CurrencyInput
        label="Currency disabled"
        name="currency-disabled"
        prefix="€"
        disabled
        allowDecimals
        defaultValue={0}
        decimalsLimit={2}
        maxLength={10}
        onChange={action('change')}
      />
    </CardContainer>
  </Card>
))
