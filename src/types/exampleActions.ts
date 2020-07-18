// action strings
export const ADD_EXAMPLE_ACTION = 'ADD_EXAMPLE_ACTION'

// ExpenseTypeFilter
export interface addExampleAction {
  type: typeof ADD_EXAMPLE_ACTION
  newExampleState: string
}

export type exampleActionType = addExampleAction
