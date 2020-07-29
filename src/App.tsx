import React, { useState } from 'react'

// Apollo client / GraphQL
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './config/apolloClient'

// React Router
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

// Pages
import ErrorPage from './pages/ErrorPage'
import IndexPage from './pages/IndexPage'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import DashboardPage from './pages/DashboardPage'

// Toastify__toast-container
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthContext } from './context/auth/useAuth'
import SettingsPage from './pages/SettingsPage'
import EditSettingsPage from './pages/EditSettingsPage'

// Redux
import { Provider } from 'react-redux'
import { store } from './redux/configureStore'

// Firebase config
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { fbConfig } from './config/firebaseConfig'

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

firebase.initializeApp(fbConfig)
firebase.firestore()

// ./Firebase config

export type Token = {
  tokens: string
}

toast.configure({
  className: 'Toastify__toast-container',
  draggable: true,
  draggablePercent: 60,
  autoClose: 2000,
})

const App: React.SFC = () => {
  const [authentication, setAuthState] = useState({
    authenticated: false,
    initializing: true,
  })

  React.useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        setAuthState({
          authenticated: !!user,
          initializing: false,
        })
      }),
    [setAuthState, authentication.authenticated]
  )

  if (authentication.initializing) {
    return <div>Loading</div>
  }
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ToastContainer />
        <Router>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/signin" component={SigninPage} />
            <PrivateRoute
              exact
              path="/dashboard"
              component={DashboardPage}
              authenticated={authentication.authenticated}
            />
            <PrivateRoute
              exact
              path="/settings"
              component={SettingsPage}
              authenticated={authentication.authenticated}
            />
            <PrivateRoute
              exact
              path="/settings/edit"
              component={EditSettingsPage}
              authenticated={authentication.authenticated}
            />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
export default App
