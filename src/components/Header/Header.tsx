import React from 'react'
import { H1 } from '../../styles/typography'
import { theme } from '../../styles/Theme'

export interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = (props) => {
  return <H1 color={theme.colors.darkPrimary}>{props.title}</H1>
}

export default Header
