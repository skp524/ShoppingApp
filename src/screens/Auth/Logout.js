import AsyncStorage from '@react-native-community/async-storage';

export const logout = async (props) => {
  try {
    await AsyncStorage.removeItem('loginAccessToken');
    props.navigation.navigate('Login');
  }
  catch (exception) {
    console.log(exception);
  }
}