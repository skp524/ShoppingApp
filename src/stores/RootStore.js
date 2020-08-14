import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Profile from './Profile';
import ProductDetails from './ProductDetails';
import Counter from './Counter';
import ShoppingCart from './ShoppingCart';
import CheckOut from './CheckOut';

class RootStore {

  login: Login;
  signUp: SignUp;
  dashboard: Dashboard;
  profile: Profile;
  productDetails: ProductDetails;
  counter: Counter;
  shoppingCart: ShoppingCart;
  checkOut: CheckOut;

  constructor() {

    this.login = new Login(this);
    this.signUp = new SignUp(this);
    this.dashboard = new Dashboard(this);
    this.profile = new Profile(this);
    this.productDetails = new ProductDetails(this);
    this.counter = new Counter(this);
    this.shoppingCart = new ShoppingCart(this);
    this.checkOut = new CheckOut(this);
  }
}
export default new RootStore();