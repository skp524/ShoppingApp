import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { inject, observer } from 'mobx-react';

@inject('shoppingCart')
@observer
class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      visibleModel: false,
    }
    this.getCurrentUser();

  }
  getCurrentUser = async () => {
    const { getCartProducts } = this.props.shoppingCart;
    try {
      const emailId = await AsyncStorage.getItem('loginAccessToken')
      if (emailId !== null) {
        getCartProducts(emailId);
      }
    } catch (error) {
      console.log(error);
    }
  }
  flatListItemSeparator = () => {
    return (
      <View
        style={styles.itemSeparator}
      />
    );
  }
  render() {
    const { cartProducts, totalOrderValue, getDiscount, discountValue, promocode } = this.props.shoppingCart;
    return (
      <View style={styles.container}>
        <FlatList
          data={cartProducts}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.flatListItemSeparator}
          renderItem={(item) => {
            return (
              <View style={styles.flatListContainer}>
                <Image
                  style={styles.imageView}
                  source={{ uri: item.item.imageUrl }} />
                <View style={styles.textContainer}>
                  <Text style={styles.textView}> Price - {item.item.price}</Text>
                  <Text style={styles.textView}> Special Price - {item.item.specialPrice}</Text>
                  <Text style={styles.textView}> Discount - {item.item.discount}</Text>
                  <Text style={styles.textView}> Qty- {item.item.qty}</Text>
                </View>
              </View>
            );
          }}
        />
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.visibleModel}>
          <View >
            <TouchableOpacity style={styles.btn} onPress={() => {
              getDiscount('GET10')
            }}>
              <Text >Get 10% off</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => getDiscount('GET20')}>
              <Text >GET 20 % Off</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => getDiscount('GET50')}>
              <Text >GET 50 % Off</Text>
            </TouchableOpacity>
            <Button title="Click To Close Modal" onPress={() => this.setState({ visibleModel: false })}
            />
          </View>
        </Modal>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => this.setState({ visibleModel: true })}>
            <Text style={styles.btnText}>{promocode}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Total Order  {totalOrderValue}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Amount Paid  {discountValue}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('CheckOut')}>
            <Text style={styles.btnText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#53b3c3'
  },
  flatListContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#53b3c3'
  },
  itemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  imageView: {
    width: '30%',
    height: 150,
    margin: 7,
    borderRadius: 50
  },
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: '#349bdc',
  },
  btn: {
    width: '50%',
    padding: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 18
  },
  textView: {
    fontSize: 18,
    padding: 5,
    color: '#fff'
  },
  textContainer: {
    flexDirection: 'column',
    width: '70%'
  },
  imageContainer: {
    width: 250,
    height: 180
  },
});
export default ShoppingCart;