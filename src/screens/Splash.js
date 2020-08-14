import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: 'Login'
    }
    this.isLogin();
  }
  isLogin = async () => {
    const userToken = await AsyncStorage.getItem('loginAccessToken');
    this.setState({ nav: (userToken !== null) ? 'Dashboard' : 'Login' })
  };
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate(this.state.nav)
    }, 500);
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/app-icon.png')}
        >
        </ImageBackground>
        <Text style={styles.text}>Shopping App</Text>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'mediumseagreen'

  },
  backgroundImage: {
    width: 150,
    height: 150,
    marginTop: '50%',
    alignSelf: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  }
});
export default Splash;