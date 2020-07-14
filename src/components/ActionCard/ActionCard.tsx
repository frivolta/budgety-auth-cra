import React from 'react'
import Card from '../Card/Card'
import { H4, H6 } from '../../styles/typography'
import { theme } from '../../styles/Theme'
import styled from 'styled-components'
import editIcon from '../../assets/images/icons/edit.svg'
import Icon from '../Icon/Icon'

// @Test ( Unit )
// - User can insert action, title text and it is displayed correctly

export interface ActionCardProps {
  title: string
  text: string
  action: (
    e: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void
}

const ActionCard: React.FC<ActionCardProps> = (props) => {
  const ActionCardWrapper = styled(Card)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `
  const ActionCardText = styled.div`
    display: flex;
    flex-direction: column;
  `
  const ActionCardAction = styled.div`
    display: flex;
  `

  return (
    <ActionCardWrapper>
      <ActionCardText>
        <H6>{props.title}</H6>
        <H4 color={theme.colors.darkPrimary}>{props.text}</H4>
      </ActionCardText>
      <ActionCardAction>
        <Icon icon={editIcon} alt="Edit" shadow onClick={props.action} />
      </ActionCardAction>
    </ActionCardWrapper>
  )
}

export default ActionCard
