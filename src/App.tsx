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
import { useHistory } from 'react-router-dom'
import EditSettingsPage from './pages/EditSettingsPage'

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
  const getLocalStorageToken = (): Token | undefined => {
    const tokens = localStorage.getItem('tokens')
    return tokens ? JSON.parse(tokens) : undefined
  }

  const setTokens = (data: Token) => {
    if (data) {
      localStorage.setItem('tokens', JSON.stringify(data))
      setAuthTokens(data)
    } else {
      setAuthTokens(undefined)
    }
  }

  const [authTokens, setAuthTokens] = useState<Token | undefined>(
    getLocalStorageToken()
  )

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <ApolloProvider client={client}>
        <ToastContainer />
        <Router>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/signin" component={SigninPage} />
            <PrivateRoute exact path="/dashboard" component={DashboardPage} />
            <PrivateRoute exact path="/settings" component={SettingsPage} />
            <PrivateRoute
              exact
              path="/settings/edit"
              component={EditSettingsPage}
            />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </ApolloProvider>
    </AuthContext.Provider>
  )
}
export default App
