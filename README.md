## Login Screen using React Redux

Understanding reducer pattern is important to be able to understand the purpose of redux in general.

Redux is inspired by Elm Programming Language. Elm consists of these three models:

- Model — the state of your application
- Update — a way to update your state
- View — a way to view your state as HTM

In React-Redux architecture, we can associate those models to:

- Model - Redux State
- Update - Reducer
- View - Component

### Let's refactor the previous Reducer pattern to React-Redux.

#### Setup

Intalling Redux and react-redux as dependency.

```shell
$ yarn add react react-redux
```

### Refactor

Move reducer to its own file called `loginReducer` that contains this:

```js
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
```

Resolve all reducers into one root reducer. You can have multiple combine reducers

```js
// @flow

import {combineReducers} from 'redux';

import loginReducer from './screens/Login/loginReducer';

let rootReducer = combineReducers({auth: loginReducer});

export default rootReducer;
```

Create Store.
Store is just like model in elm, except it will make your models available on global access.

```js
// @flow

import {createStore} from 'redux';
import rootReducer from './rootReducer';

let store = createStore(rootReducer);

export default store;
```

On your root application, put redux provider uppormost component tree. Basically, it's a context that we'll explain later.

```js
<Provider store={reduxStore}>
  <Login />
</Provider>
```

In your `LoginScreen`

```js
let mapStateToProps = (state: RootState) => {
  let {auth} = state;
  return {
    email: auth.email,
    password: auth.password,
    activeTextInput: auth.activeTextInput,
  };
};

export default connect(
  mapStateToProps,
  (dispatch: Dispatch) => {
    return {
      dispatch,
    };
  },
)(Login);
```

I am not creating action creator because `flow` already saves us here, we can get type inference without poluting redux with boilerplates.
