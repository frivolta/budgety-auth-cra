import React, { useState } from 'react'

// Apollo client / GraphQL
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './config/apolloClient'

// React Router
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// Pages
import ErrorPage from './pages/ErrorPage'
import IndexPage from './pages/IndexPage'

// Toastify__toast-container
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthContext } from './context/auth/useAuth'

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
  const getLocalStorageToken = (): Token | null => {
    const tokens = localStorage.getItem('tokens')
    return tokens ? JSON.parse(tokens) : undefined
  }

  const setTokens = (data: Token) => {
    localStorage.setItem('tokens', JSON.stringify(data))
    setAuthTokens(data)
  }

  const [authTokens, setAuthTokens] = useState(getLocalStorageToken())

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <ApolloProvider client={client}>
        <ToastContainer />
        <Router>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </ApolloProvider>
    </AuthContext.Provider>
  )
}
export default App
