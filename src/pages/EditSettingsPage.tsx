import React from 'react'
import GridLayout from '../layout/GridLayout/GridLayout'
import Card from '../components/Card/Card'
import firebase from 'firebase/app'
import styled from 'styled-components'
import { Input } from '../components/Input/Input'
import { CustomLabel } from '../components/Label/Label'
import { CustomButton } from '../components/Button/Button'
import { useFormik } from 'formik'
import { formatNetworkErrorMessages } from '../utils/format'
import { Link } from 'react-router-dom'
import { AppState } from '../redux/configureStore'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { UserProfile } from '../types/user'
import { defaultUserProfile } from '../constants/user'
import { EditSettingsSchema } from '../validation/Settings.validation'
export const FormikForm = styled.form`
  width: 100%;
`
// @Test
// - User can see correct options
// - Confirm is used only if edit occours
// - User can go back to settings page both from top icon and bottom link
// - User can triggers api
// - If no settings is present only placeholder are shown and all links are disabled
// - Numbers are correctly formatted

const EditSettingsPage: React.FC = () => {
  let error: any = undefined
  const loading = false
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

  const formik = useFormik({
    initialValues: {
      balanceName: userProfile?.balanceName || defaultUserProfile.balanceName,
      startingBalance:
        userProfile?.startingBalance || defaultUserProfile.startingBalance,
      monthlyBudget:
        userProfile?.monthlyBudget || defaultUserProfile.monthlyBudget,
    },
    validationSchema: EditSettingsSchema,
    onSubmit: async (values) => {
      const editedUserProfile: UserProfile = {
        isEmpty: false,
        balanceName: values.balanceName,
        startingBalance: values.startingBalance,
        monthlyBudget: values.monthlyBudget,
      }
      await firebase
        .firestore()
        .collection('profiles')
        .doc(auth.uid)
        .set(editedUserProfile)
    },
  })

  return (
    <GridLayout title="Edit Settings">
      <Card customWidth={100}>
        <FormikForm onSubmit={formik.handleSubmit}>
          <Input
            name="balanceName"
            placeholder={
              !profileIsLoading ? userProfile?.balanceName : 'Loading...'
            }
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.balanceName}
            label="Account name"
            hasErrors={
              formik.touched.balanceName && formik.errors.balanceName
                ? true
                : false
            }
            errorMessage={formik.errors.balanceName?.toString()}
          />
          <Input
            name="startingBalance"
            placeholder={
              !profileIsLoading ? userProfile?.startingBalance : 'Loading...'
            }
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.startingBalance}
            label="Starting Balance"
            hasErrors={
              formik.touched.startingBalance && formik.errors.startingBalance
                ? true
                : false
            }
            errorMessage={formik.errors.startingBalance?.toString()}
          />
          <Input
            name="monthlyBudget"
            placeholder={
              !profileIsLoading ? userProfile?.monthlyBudget : 'Loading...'
            }
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.monthlyBudget}
            label="Monthly Budget"
            hasErrors={
              formik.touched.monthlyBudget && formik.errors.monthlyBudget
                ? true
                : false
            }
            errorMessage={formik.errors.monthlyBudget?.toString()}
          />
          {error && (
            <CustomLabel type="error">
              {formatNetworkErrorMessages(error.message)}
            </CustomLabel>
          )}
          <CustomButton
            text="Confirm"
            disabled={!formik.isValid || !formik.dirty || loading}
            margin="32px 0 16px 0"
            isLoading={loading}
            data-testid="SubmitButton"
          />
          <CustomLabel>
            Cancel and go back to <Link to="/settings">Settings Page.</Link>
          </CustomLabel>
        </FormikForm>
      </Card>
    </GridLayout>
  )
}

export default EditSettingsPage
