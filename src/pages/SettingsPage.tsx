import React from 'react'
import GridLayout from '../layout/GridLayout/GridLayout'
import Card from '../components/Card/Card'
import { H4 } from '../styles/typography'
import { theme } from '../styles/Theme'
import { CustomSmallButton } from '../components/SmallButton/SmallButton'
import { useHistory } from 'react-router-dom'
import Avatar from 'react-avatar'
import styled from 'styled-components'
import ActionCard from '../components/ActionCard/ActionCard'
import { useFirebase } from 'react-redux-firebase'
import { LOGOUT_SUCCESS, LOGOUT_ERRORS } from '../utils/messages'
import { toasterInfo, toasterError } from '../utils/toaster'
import { useSelector } from 'react-redux'
import { AppState } from '../redux/configureStore'
import { useFirestoreConnect } from 'react-redux-firebase'

// @Test
// - User can see account name or empty
// - User can see starting balance or empty
// - User can see monthly budget or empty
// - User can logout
// - User can go to edit settings page clicking on any of action icons
// - User cannot click on "Go to settings icon"

const SettingsPage: React.FC = () => {
  const history = useHistory()
  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)
  useFirestoreConnect(() => [
    { collection: 'profiles', doc: auth.uid, storeAs: 'userProfile' },
  ])
  const userProfile = useSelector(
    (state: AppState) => state.firestore.data.userProfile
  )
  const profileIsLoading = useSelector(
    (state: AppState) => state.firestore.status.requesting.userProfile
  )

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut()
      toasterInfo(LOGOUT_SUCCESS.success)
      history.push('/signin')
    } catch {
      toasterError(LOGOUT_ERRORS.genericError)
    }
  }

  const redirectToEditSettings = () => {
    history.push('/settings/edit')
  }

  const AvatarContainer = styled.div`
    margin: 16px 0;
  `

  return (
    <GridLayout title="Settings">
      {auth.isLoaded && !profileIsLoading && (
        <Card>
          <AvatarContainer>
            {auth.email && <Avatar name={auth.email} size="150" round />}
          </AvatarContainer>
          <H4 color={theme.colors.darkPrimary}>{auth && auth.email}</H4>
          <CustomSmallButton text="Logout" handleClick={handleLogout} />
        </Card>
      )}
      {!profileIsLoading && userProfile?.isEmpty && (
        <Card>
          <p>Edit the settings below to start using the applicaiton</p>
        </Card>
      )}

      <ActionCard
        title="ACCOUNT NAME"
        text={!profileIsLoading ? userProfile?.balanceName : 'Loading...'}
        action={redirectToEditSettings}
      />
      <ActionCard
        title="STARTING BALANCE"
        text={!profileIsLoading ? userProfile?.startingBalance : 'Loading...'}
        action={redirectToEditSettings}
      />
      <ActionCard
        title="MONTHLY BUDGET"
        text={!profileIsLoading ? userProfile?.monthlyBudget : 'Loading...'}
        action={redirectToEditSettings}
      />
    </GridLayout>
  )
}

export default SettingsPage
