// action strings
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST'
export const ADD_USER_ERROR = 'ADD_USER_ERROR'
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'

// ExpenseTypeFilter
export interface addUserRequest {
  type: typeof ADD_USER_REQUEST
  email: string
  password: string
}
export interface addUserError {
  type: typeof ADD_USER_ERROR
  error: string
}
export interface addUserSuccess {
  type: typeof ADD_USER_SUCCESS
}

export type userActionType = addUserError | addUserRequest | addUserSuccess
