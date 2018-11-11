// @flow

import * as React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import Logo from '../../images/logo.png';
import {Button, Text} from '../../core-ui';
import {WHITE, BLUE_SEA, LIGHT_GREY} from '../../constants/colors';

import type {RootState} from '../../RootState';
import type {RootAction} from '../../RootAction';
import type {Dispatch} from 'redux';

type Props = {
  email: string,
  password: string,
  activeTextInput: 'EMAIL' | 'PASSWORD' | null,
  dispatch: Dispatch<RootAction>,
};

function Login(props: Props) {
  let {email, password, activeTextInput, dispatch} = props;
  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Image source={Logo} style={{height: 200}} resizeMode="contain" />
        </View>
        <View>
          <Text>Username or Email</Text>
          <TextInput
            value={email}
            onChangeText={(email) => dispatch({type: 'ChangeEmail', email})}
            onFocus={() =>
              dispatch({
                type: 'SetActiveTextInput',
                activeTextInput: 'EMAIL',
              })
            }
            style={[
              styles.textInput,
              activeTextInput === 'EMAIL' && styles.activeTextInput,
            ]}
          />
          <Text>Password</Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={(password) =>
              dispatch({type: 'ChangePassword', password})
            }
            onFocus={() =>
              dispatch({
                type: 'SetActiveTextInput',
                activeTextInput: 'PASSWORD',
              })
            }
            style={[
              styles.textInput,
              activeTextInput === 'PASSWORD' && styles.activeTextInput,
            ]}
          />
        </View>
        <Button text="SIGN IN" onPress={() => {}} />
      </KeyboardAvoidingView>
    </View>
  );
}

let styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 40,
    backgroundColor: WHITE,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  activeTextInput: {
    borderBottomColor: BLUE_SEA,
  },
  textInput: {
    height: 40,
    borderBottomColor: LIGHT_GREY,
    borderBottomWidth: 2,
    marginBottom: 50,
  },
});

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
  (dispatch: Dispatch<RootAction>) => {
    return {
      dispatch: dispatch,
    };
  },
)(Login);
