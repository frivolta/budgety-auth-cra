import React, { useState } from 'react'
import GridLayout from '../layout/GridLayout/GridLayout'
import Card from '../components/Card/Card'
import { H4 } from '../styles/typography'
import { theme } from '../styles/Theme'
import { CustomSmallButton } from '../components/SmallButton/SmallButton'
import { useAuth } from '../context/auth/useAuth'
import { useHistory } from 'react-router-dom'

const SettingsPage: React.FC = () => {
  const [image, setImage] = useState({ preview: '', raw: '' })
  const auth: any = useAuth()
  let history = useHistory()

  const handleLogout = () => {
    auth?.setAuthTokens()
    localStorage.removeItem('tokens')
    history.push('/signin')
  }

  return (
    <GridLayout title="Settings">
      <Card>
        <H4 color={theme.colors.darkPrimary}>email@email.it</H4>
        <CustomSmallButton text="Logout" handleClick={handleLogout} />
        <CustomSmallButton text="Upload Picture" inverted margin="0" />
      </Card>
      <Card>Card</Card>
    </GridLayout>
  )
}

export default SettingsPage
