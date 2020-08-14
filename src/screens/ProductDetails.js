import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { inject, observer } from 'mobx-react';
import Cart from '../components/Cart';
import Counter from '../components/Counter';

@inject('productDetails', 'counter', 'shoppingCart')
@observer
class ProductDetails extends Component {
  static navigationOptions = {
    headerRight: () => <Cart />
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { fetchProductDetails, getCurrentUser, fetchProductReviews } = this.props.productDetails;
    getCurrentUser();
    const { getParam } = this.props.navigation;
    fetchProductDetails(getParam('product_id'));
    fetchProductReviews(getParam('product_id'));
  }

  render() {
    const { productDetails, addProductInCart, currentUserEmailId, productReviews } = this.props.productDetails;
    const { counter } = this.props.counter;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.textView}>{productDetails.name}</Text>
          <Image
            style={styles.imageView}
            source={{ uri: productDetails.image_url }} />
          <Text style={styles.textView}>  {productDetails.descriptions}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.textView}> Price - {productDetails.price}</Text>
            <Text style={styles.textView}> Special Price - {productDetails.special_price}</Text>
            <Text style={styles.textView}> Discount - {productDetails.discount}</Text>
            <Counter />
          </View>

          {(productReviews !== undefined) && productReviews.map((item, key) => (
            <View key={key} style={styles.reviewContainer}>
              <Text style={styles.textView}> Reviewer - {item.nickname}</Text>
              <Text style={styles.textView}> Details  - {item.detail} </Text>
              <Text style={styles.textView}> Rating -  {item.vote}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}
            onPress={() => {
              const productDetail = {
                emailId: currentUserEmailId,
                productId: productDetails.product_id,
                productName: productDetails.name,
                qty: counter,
                imageUrl: productDetails.image_url,
                price: productDetails.price,
                specialPrice: productDetails.special_price,
                discount: productDetails.discount
              }
              addProductInCart(productDetail);
              Alert.alert('Product Added Sucessfully')
            }}
          >
            <Text style={styles.btnText}>Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('CheckOut')}>
            <Text style={styles.btnText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View >
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
  reviewContainer: {

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
export default ProductDetails;