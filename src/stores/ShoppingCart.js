import { action, observable } from 'mobx';
import { getCartProducts } from '../database/handler/ShoppingCart';

class ShoppingCart {

  @observable cartProducts = [];
  @observable promocode = [];
  @observable totalOrderValue = 0;
  @observable promocode = 'Apply Promocode';
  @observable discountValue = 0;

  @action getCartProducts = (emailId) => {
    getCartProducts(emailId).then((res) => {
      this.cartProducts = res.products;
      this.totalOrderValue = 0;
      res.products.forEach(product => {
        let totalOrderValue = ((product.specialPrice) * (product.qty));
        this.totalOrderValue += totalOrderValue;
      });
      this.discountValue = this.totalOrderValue;
    }).catch((error) => {
      console.log(error);
    });
  };
  @action getDiscount = (promoCode) => {
    if (promoCode === 'GET10') {
      this.discountValue = ((this.totalOrderValue) - (this.totalOrderValue * .1));
      this.promocode = 'GET 10% OFF';
    }
    else if (promoCode === 'GET20') {
      this.discountValue = ((this.totalOrderValue) - (this.totalOrderValue * .2));
      this.promocode = 'GET 20% OFF';
    }
    else if (promoCode === 'GET50') {
      this.discountValue = ((this.totalOrderValue) - (this.totalOrderValue * .5));
      this.promocode = 'GET 50% OFF';
    }
    console.log(this.discountValue);
  };
}
export default ShoppingCart;