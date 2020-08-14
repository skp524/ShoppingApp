import { action, observable } from 'mobx';
import { getCartProducts } from '../database/handler/ShoppingCart';

class ShoppingCart {

  @observable cartProducts = [];
  @observable totalOrderValue = 0;

  @action getCartProducts = (emailId) => {
    getCartProducts(emailId).then((res) => {
      this.cartProducts = res.products;
      this.totalOrderValue = 0;
      res.products.forEach(product => {
        let totalOrderValue = ((product.specialPrice) * (product.qty));
        this.totalOrderValue += totalOrderValue;
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}
export default ShoppingCart;