import React from 'react'
import GridLayout from '../layout/GridLayout/GridLayout'
import Card from '../components/Card/Card'
import { H4 } from '../styles/typography'
import { theme } from '../styles/Theme'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Input } from '../components/Input/Input'
import { CustomLabel } from '../components/Label/Label'
import { CustomButton } from '../components/Button/Button'
import { useFormik } from 'formik'
import { formatNetworkErrorMessages } from '../utils/format'

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
  let history = useHistory()
  let error: any = undefined
  const loading = false

  const formik = useFormik({
    initialValues: {
      accountName: 'Banco Desio',
      startingBalance: '€ 10.000,00',
      monthlyBalance: '€ 1.400,00',
    },
    //    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      console.log('editing values')
    },
  })

  return (
    <GridLayout title="Edit Settings">
      <Card customWidth={100}>
        <FormikForm onSubmit={formik.handleSubmit}>
          <Input
            name="accountName"
            placeholder="account name"
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.accountName}
            label="Account name"
            hasErrors={
              formik.touched.accountName && formik.errors.accountName
                ? true
                : false
            }
            errorMessage={formik.errors.accountName}
          />
          <Input
            name="startingBalance"
            placeholder="Starting Balance"
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
            errorMessage={formik.errors.startingBalance}
          />
          <Input
            name="monthlyBalance"
            placeholder="Monthly Budget"
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.monthlyBalance}
            label="Monthly Budget"
            hasErrors={
              formik.touched.monthlyBalance && formik.errors.monthlyBalance
                ? true
                : false
            }
            errorMessage={formik.errors.monthlyBalance}
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
            Cancel and go back to <a href="/settings">Settings Page.</a>
          </CustomLabel>
        </FormikForm>
      </Card>
    </GridLayout>
  )
}

export default EditSettingsPage
