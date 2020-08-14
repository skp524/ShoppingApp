import { action, observable, computed } from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import { addProductInCart } from '../database/handler/ShoppingCart';

class productDetails {

  @observable productDetails = [];
  @observable currentUserEmailId = '';
  @observable productReviews = [];

  @action fetchProductDetails = (productId) => {

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "product_id": productId,
        "customer_id": 96,  // hardcoded
        "wcode": "DWK,HWH,S71"  // hardcoded
      }
      )
    }
    fetch('https://preprod.vestigebestdeals.com/api/rest/productdetails', requestOptions)
      .then(res => res.json())
      .then(res => {
        this.productDetails = res.data;
      }).catch(error => {
        console.log('error in fetching data', error);
      });
  };

  @action fetchProductReviews = (productId) => {
    fetch('https://preprod.vestigebestdeals.com/api/rest/getreview/productId/' + productId,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then((res) => {
        this.productReviews = res.data.reviewlist;
      }).catch(error => {
        console.log('error in fetching data', error);
      })
  };

  @action addProductInCart = (productDetail) => {
    addProductInCart(productDetail);
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
  @computed get _productDetails() {
    return this.productDetails;
  }

}
export default productDetails;