import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };


  componentDidMount() {
    firebase.initializeApp({
        // Must create a Firebase.io account and create Authentication App
        // with API key, AuthDomain, DatabaseURL, ProjectID, StorageBucket
        // for this app to work correctly, otherwise error will result
      
         apiKey: '',
         authDomain: '',
         databaseURL: '',
         projectId: '',
         storageBucket: ''
    })

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
  }

renderContent() {
  switch (this.state.loggedIn) {
    case true:
    return <CardSection><Button onPress={() => firebase.auth().signOut()}>Log Out
    </Button></CardSection>
    case false:
    return <LoginForm />
    default:
    return <Spinner size="large" />
    }
  }

render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
