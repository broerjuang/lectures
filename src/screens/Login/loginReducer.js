// @flow

type InputType = 'EMAIL' | 'PASSWORD';

export type Action =
  | {type: 'ChangeEmail', email: string}
  | {type: 'ChangePassword', password: string}
  | {type: 'SetActiveTextInput', activeTextInput: InputType};

export type State = {
  email: string,
  password: string,
  activeTextInput: ?InputType,
};

const INITIAL_STATE = {
  email: '',
  password: '',
  activeTextInput: null,
};

let loginReducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'ChangeEmail': {
      return {
        ...state,
        email: action.email,
      };
    }
    case 'ChangePassword': {
      return {
        ...state,
        password: action.password,
      };
    }
    case 'SetActiveTextInput': {
      return {
        ...state,
        activeTextInput: action.activeTextInput,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
