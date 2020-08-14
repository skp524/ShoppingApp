import { ShoppingCart, Product } from '../schema/ShoppingCart';
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
      resolve(allProducts);
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
        realm.delete(allProducts);
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });;
});