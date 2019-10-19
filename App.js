import React from 'react';
import { Button, Platform, SafeAreaView } from 'react-native';
import Auth0 from 'react-native-auth0';
import * as AppAuth from 'expo-app-auth';
import config from './config';

const auth0 = new Auth0({
  domain: config.domain,
  clientId: config.clientId
});

const bundleIdentifier = 'expo.app.auth.test';

const auth0ClientId = config.clientId;
const auth0Domain = config.domain;

const config = {
  issuer: `https://${auth0Domain}`,
  scopes: ['openid profile'],
  clientId: auth0ClientId,
  redirectUrl: `${bundleIdentifier}://${auth0Domain}/${Platform.OS}/${bundleIdentifier}/callback`
};

export default class App extends React.Component {
  login = () => {
    console.log('config:', JSON.stringify(config, null, 2));

    AppAuth.authAsync(config)
      .then(response => console.log('resolved', response))
      .catch(error => console.log('error', error));
  };
  onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
        audience: 'https://' + auth0Domain + '/userinfo'
      })
      .then(credentials => {
        console.log(credentials, 'credentials');
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <SafeAreaView>
        <Button title="Login" onPress={this.onLogin} />
      </SafeAreaView>
    );
  }
}
