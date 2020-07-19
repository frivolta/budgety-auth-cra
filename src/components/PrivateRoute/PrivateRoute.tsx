import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from '../../context/auth/useAuth'

interface PrivateRouteProps extends RouteProps {
  component: any
  authenticated: boolean
}

const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  )
}

export default PrivateRoute
