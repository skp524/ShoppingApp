import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Splash from '../screens/Splash';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import ProductDetails from '../screens/ProductDetails';
import ShoppingCart from '../screens/ShoppingCart';
import CheckOut from '../screens/CheckOut';
import Profile from '../screens/Profile';
import { logout } from '../screens/Auth/Logout';

const CustomDrawerSidebar = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        </TouchableOpacity>
      </View>
      <DrawerItems {...props} />
      <TouchableOpacity
        onPress={() =>
          logout(props)}>
        <Text style={styles.btnTxt}>Logout</Text>
      </TouchableOpacity>
    </View>);
}
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer:
  {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15
  }
});
export default createAppContainer(AppRouter);