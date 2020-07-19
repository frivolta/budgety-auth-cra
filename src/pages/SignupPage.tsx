import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useFormik } from 'formik'
import Theme, { theme } from '../styles/Theme'
import { FullPageLayout } from '../layout/FullPageLayout'
import { device } from '../styles/config'
import { H1, Span } from '../styles/typography'
import { Input } from '../components/Input/Input'
import { CustomButton } from '../components/Button/Button'
import { CustomLabel } from '../components/Label/Label'
import { SignupSchema } from '../validation/Signup.validation'
import { SIGNUP_SUCCESS, SIGNUP_ERRORS } from '../utils/messages'
import { toasterError, toasterSuccess } from '../utils/toaster'
import { useAuth } from '../context/auth/useAuth'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { authErrors } from '../types/firebaseAuth'

export const SignupCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: ${(props) => props.theme.colors.lightPrimary};
  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: ${(props) => props.theme.misc.borderRadius};
  min-width: 150px;
  min-height: 150px;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
  font-family: ${(props) => props.theme.fonts[1]};
  @media ${device.laptop} {
    width: 512px;
    height: auto;
    max-width: 900px;
  }
`
const SignupCardContent = styled.div`
  width: 100%;
  padding: 48px 32px;
  h1 {
    padding-bottom: 24px;
  }
`

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`

const SignupPage: React.FC = () => {
  const [isLoading, setIsloading] = React.useState(false)
  const [error, setError] = React.useState<undefined | authErrors>(undefined)
  const useAuthValues: any = useAuth()
  let history = useHistory()

  React.useEffect(() => {
    // Check if user is already logged in
    if (useAuthValues.authTokens) {
      history.push('/dashboard')
    }
  }, [useAuthValues.authTokens, history])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        setIsloading(true)
        await firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
        toasterSuccess(SIGNUP_SUCCESS.success)
        formik.resetForm()
        setIsloading(false)
      } catch (error) {
        setIsloading(false)
        toasterError(SIGNUP_ERRORS.genericError)
        setError(error)
      }
    },
  })
  return (
    <Theme>
      <FullPageLayout>
        <SignupCard>
          <SignupCardContent>
            <H1 color={theme.colors.darkPrimary}>
              Fill out the form <br />
              and <Span>Sign Up</Span>.
            </H1>
            <form onSubmit={formik.handleSubmit}>
              <Input
                name="email"
                placeholder="yourname@company.com"
                type="text"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.email}
                label="Email"
                hasErrors={
                  formik.touched.email && formik.errors.email ? true : false
                }
                errorMessage={formik.errors.email}
              />
              <Input
                name="password"
                placeholder="password"
                type="password"
                label="Password"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.password}
                hasErrors={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                errorMessage={formik.errors.password}
              />
              <Input
                name="confirmPassword"
                placeholder="Confirm Password"
                label="Confirm Password"
                type="password"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                hasErrors={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? true
                    : false
                }
                errorMessage={formik.errors.confirmPassword}
              />
              {error && <CustomLabel type="error">{error.message}</CustomLabel>}
              <CustomButton
                text="Sign up"
                disabled={!formik.isValid || !formik.dirty || isLoading}
                margin="32px 0 16px 0"
                isLoading={isLoading}
                data-testid="SubmitButton"
              />
              <CustomLabel>
                Already have an account? <a href="/signin">Sign in.</a>
              </CustomLabel>
            </form>
          </SignupCardContent>
        </SignupCard>
      </FullPageLayout>
    </Theme>
  )
}

export default SignupPage
