import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Splash from '../screens/Splash';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import ProductDetails from '../screens/ProductDetails';
import ShoppingCart from '../screens/ShoppingCart';
import CheckOut from '../screens/CheckOut';
import Profile from '../screens/Profile';
import CustomDrawerSidebar from '../components/CustomDrawerSidebar';

const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
  ProductDetails: {
    screen: ProductDetails
  },
  Profile: { screen: Profile },
  CheckOut: { screen: CheckOut }
});

const DrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: DashboardStack },
  ShoppingCart: { screen: ShoppingCart },
},
  {
    contentComponent: CustomDrawerSidebar,
  });

const AuthStack = createStackNavigator({
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  }
});

const AppRouter = createSwitchNavigator({
  Splash: {
    screen: Splash
  },
  Login: {
    screen: AuthStack
  },
  Dashboard: {
    screen: DrawerNavigator
  }
});

export default createAppContainer(AppRouter);