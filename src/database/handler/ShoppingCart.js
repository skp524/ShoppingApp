import { ShoppingCart, Product } from '../schema/ShoppingCart';
import { Alert } from 'react-native';
const Realm = require('realm');

const databaseOptions = {
  schema: [ShoppingCart, Product],
  schemaVersion: 0,
};
export const addProductInCart = productDetails => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let shoppingCart = realm.objectForPrimaryKey('ShoppingCart', productDetails.emailId);
      if (shoppingCart != null) {
        shoppingCart.products.push({
          productId: productDetails.productId,
          productName: productDetails.productName,
          qty: productDetails.qty,
          imageUrl: productDetails.imageUrl,
          price: productDetails.price,
          specialPrice: productDetails.specialPrice,
          discount: productDetails.discount
        })
      }
      else {
        let newShoppingCart = realm.create('ShoppingCart', productDetails);
        newShoppingCart.products.push({
          productId: productDetails.productId,
          productName: productDetails.productName,
          qty: productDetails.qty,
          imageUrl: productDetails.imageUrl,
          price: productDetails.price,
          specialPrice: productDetails.specialPrice,
          discount: productDetails.discount
        });
      }
      resolve();
    });
  }).catch((error) => reject(error));
});

export const getCartProducts = async (emailId) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      let allProducts = realm.objectForPrimaryKey('ShoppingCart', emailId);
      (allProducts !== undefined) ? resolve(allProducts) : Alert.alert('Your Cart is Empty');
    })
    .catch(error => {
      reject(error);
    });;
});
export const deleteCartProducts = async (emailId) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {
        let allProducts = realm.objectForPrimaryKey('ShoppingCart', emailId);
        console.log(allProducts);
        (allProducts !== undefined) ? realm.delete(allProducts) : Alert.alert('Your Cart is Empty');
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });;
});