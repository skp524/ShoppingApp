import { action, observable } from 'mobx';
import { deleteCartProducts } from '../database/handler/ShoppingCart';
import AsyncStorage from '@react-native-community/async-storage';

class CheckOut {

  @observable currentUserEmailId = '';

  @action deleteCartProducts = (emailId) => {

    deleteCartProducts(emailId)
  };

  @action getCurrentUser = async () => {
    try {
      const value = await AsyncStorage.getItem('loginAccessToken')
      if (value !== null) {
        this.currentUserEmailId = value;
      }
    } catch (error) {
      console.log(error)
    }
  }
}
export default CheckOut;