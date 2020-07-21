export enum SIGNUP_ERRORS {
  required = 'Required',
  invalidEmail = 'Email not valid',
  invalidPassword = 'Password not strong enough',
  passwordRequired = 'Please enter your password',
  confirmPasswordRequired = 'Please confirm your password',
  passwordMatch = 'Passwords must match',
  genericError = 'Oops, something went wrong...',
}

export enum SIGNIN_ERRORS {
  required = 'Required',
  genericError = 'Oops, something went wrong...',
}

export enum SIGNUP_SUCCESS {
  success = 'You succesfully signed up!',
}

export enum SIGNIN_SUCCESS {
  success = 'You succesfully signed in!',
}

export enum LOGOUT_SUCCESS {
  success = 'You are now logged out',
}

export enum LOGOUT_ERRORS {
  genericError = 'Oops, an error occoured try again later',
}

export enum EDIT_SETTINGS_ERROR {
  balanceNameRequired = 'An account name is required',
  startingBalance = 'A starting balance is required',
  monthlyBudget = 'A monthly budget is required',
}
