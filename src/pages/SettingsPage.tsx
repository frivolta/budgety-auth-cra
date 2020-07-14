import React from 'react'
import GridLayout from '../layout/GridLayout/GridLayout'
import Card from '../components/Card/Card'
import { H4 } from '../styles/typography'
import { theme } from '../styles/Theme'
import { CustomSmallButton } from '../components/SmallButton/SmallButton'
import { useAuth } from '../context/auth/useAuth'
import { useHistory } from 'react-router-dom'
import Avatar from 'react-avatar'
import styled from 'styled-components'
import ActionCard from '../components/ActionCard/ActionCard'

// @Test
// - User can see account name or empty
// - User can see starting balance or empty
// - User can see monthly budget or empty
// - User can logout
// - User can go to edit settings page clicking on any of action icons
// - User cannot click on "Go to settings icon"

const SettingsPage: React.FC = () => {
  const auth: any = useAuth()
  let history = useHistory()

  const handleLogout = () => {
    auth?.setAuthTokens()
    localStorage.removeItem('tokens')
    history.push('/signin')
  }

  const redirectToEditSettings = () => {
    history.push('/settings/edit')
  }

  const AvatarContainer = styled.div`
    margin: 16px 0;
  `

  return (
    <GridLayout title="Settings">
      <Card>
        <AvatarContainer>
          <Avatar name="email@email.it" size="150" round />
        </AvatarContainer>
        <H4 color={theme.colors.darkPrimary}>email@email.it</H4>
        <CustomSmallButton text="Logout" handleClick={handleLogout} />
      </Card>
      <ActionCard
        title="ACCOUNT NAME"
        text="Banco desio"
        action={redirectToEditSettings}
      />
      <ActionCard
        title="STARTING BALANCE"
        text="€ 10.000,00"
        action={redirectToEditSettings}
      />
      <ActionCard
        title="MONTHLY BUDGET"
        text="€ 1.400,00"
        action={redirectToEditSettings}
      />
    </GridLayout>
  )
}

export default SettingsPage
