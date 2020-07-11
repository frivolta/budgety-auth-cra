import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Card from '../Card/Card'
import CardContainer from '../Card/CardContainer'
import { CustomSmallButton } from './SmallButton'

storiesOf('Components', module).add('Small Button', () => (
  <Card customWidth={10}>
    <CardContainer>
      <CustomSmallButton handleClick={action('click')} text="Small Button" />
      <CustomSmallButton
        handleClick={action('click')}
        text="Small Button Inverted"
        inverted
      />
    </CardContainer>
  </Card>
))
