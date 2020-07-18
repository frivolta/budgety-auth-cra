import { ADD_EXAMPLE_ACTION } from '../../types/exampleActions'
import { AppActions } from '../../types/appActions'

export const addExample = (example: string): AppActions => ({
  type: ADD_EXAMPLE_ACTION,
  newExampleState: example,
})
