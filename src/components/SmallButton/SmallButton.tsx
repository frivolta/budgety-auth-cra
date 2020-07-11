import React from 'react'
import styled from 'styled-components'

interface SmallButtonProps {
  handleClick?: (
    e: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void
  text?: string
  disabled?: boolean
  margin?: string
  inverted?: boolean
}

export const SmallButton = styled.button<SmallButtonProps>`
  background-color: ${(props) =>
    props.inverted
      ? props.theme.colors.lightPrimary
      : props.theme.colors.primaryColor};
  box-shadow: ${(props) =>
    props.inverted ? `none` : `0px 2px 10px rgba(0, 0, 0, 0.25)`};
  border-radius: 50px;
  width: 100%;
  padding: 5px;
  margin: ${(props) =>
    props.margin ? props.margin : `${props.theme.fontSizes.base} 0`};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.4' : '1')};
  transition: all ease-out 0.5s;
  border: ${(props) =>
    props.inverted ? `2px solid ${props.theme.colors.primaryColor}` : `none`};
  color: ${(props) =>
    props.inverted
      ? props.theme.colors.primaryColor
      : props.theme.colors.lightPrimary};
  :hover {
    opacity: ${(props) =>
      props.disabled ? '0.4' : props.inverted ? '0.6' : '0.8'};
    transition: all ease-out 0.5s;
  }
`
export const SmallButtonLabel = styled.span`
  margin-top: 1px;
  font-family: ${(props) => props.theme.fonts[0]};
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 500;
`

export const CustomSmallButton: React.FC<SmallButtonProps> = (props) => {
  return (
    <SmallButton
      onClick={props.handleClick}
      disabled={props.disabled}
      data-testid="CustomSmallButton"
      margin={props.margin}
      inverted={props.inverted}
    >
      <SmallButtonLabel>{props.text && props.text}</SmallButtonLabel>
    </SmallButton>
  )
}
