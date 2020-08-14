import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Cart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>0</Text>
        <Icon
          name='ios-cart' size={40} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});
export default Cart;