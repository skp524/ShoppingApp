import { observable, action, computed } from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import { getAllUsers } from '../database/handler/User';

class Login {

  @observable usersDetails = [];

  @action getAllUsers = () => {
    getAllUsers().then((res) => {
      this.usersDetails = res;
    }).catch((error) => {
      console.log(error);
    });
  };

  @action storeCurrentUser = async (user) => {
    try {
      await AsyncStorage.setItem('loginAccessToken', user.emailId)
    } catch (e) {
      console.log(error);
    }
  }
}
export default Login;