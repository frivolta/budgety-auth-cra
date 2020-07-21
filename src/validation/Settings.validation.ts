import * as yup from 'yup'
import { EDIT_SETTINGS_ERROR } from '../utils/messages'
export const EditSettingsSchema = yup.object().shape({
  balanceName: yup.string().required(EDIT_SETTINGS_ERROR.balanceNameRequired),
  startingBalance: yup
    .string()
    .required(EDIT_SETTINGS_ERROR.balanceNameRequired),
  monthlyBudget: yup.string().required(EDIT_SETTINGS_ERROR.balanceNameRequired),
})
