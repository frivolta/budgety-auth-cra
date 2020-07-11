import React from 'react'
import { storiesOf } from '@storybook/react'
import Card from '../Card/Card'
import CardContainer from '../Card/CardContainer'
import { H1, H2, H3, H4, H5, H6, Text, Span } from '../../styles/typography'

storiesOf('Typography', module).add('Typography', () => (
  <Card customWidth={50}>
    <CardContainer>
      <H1>H1. Lorem ipsum</H1>
      <H2>H2. Lorem ipsum</H2>
      <H3>H3. Lorem ipsum</H3>
      <H4>H4. Lorem ipsum</H4>
      <H5>H5. Lorem ipsum</H5>
      <H6>H6. Lorem ipsum</H6>
      <Text>Standard Text. Lorem ipsum</Text>
      <Span>Standard Span. Lorem ipsum</Span>
    </CardContainer>
  </Card>
))
