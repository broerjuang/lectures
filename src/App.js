// @flow
import * as React from 'react';
import {Provider} from 'react-redux';
import Login from './screens/Login/Login';
import reduxStore from './reduxStore';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={reduxStore}>
        <Login />
      </Provider>
    );
  }
}

export default App;
