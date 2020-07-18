import {
  exampleActionType,
  ADD_EXAMPLE_ACTION,
} from '../../types/exampleActions'

interface IExampleState {
  example: string
}

const exampleDefaultState: IExampleState = {
  example: 'example state',
}

const exampleReducer = (
  state = exampleDefaultState,
  action: exampleActionType
): IExampleState => {
  switch (action.type) {
    case ADD_EXAMPLE_ACTION:
      return {
        ...state,
        example: action.newExampleState,
      }
    default:
      return state
  }
}

export { exampleReducer }
