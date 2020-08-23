import React, { Component } from 'react';
import { Text, View, Button, FlatList, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { inject, observer } from 'mobx-react';
import RadioForm from 'react-native-simple-radio-button';
import Cart from '../components/Cart';

@inject('dashboard')
@observer
class Dashboard extends Component {

  static navigationOptions = {
    headerRight: () => <Cart />
  };
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      productDetails: [],
      modelVisible: false,
      sortProducts: "",
      numColumns: 1,
      view: 'Grid'
    }
  }
  componentDidMount() {
    const { fetchProductDetails, productDetails } = this.props.dashboard;
    fetchProductDetails(this.state.sortProducts);
    this.setState({ productDetails: productDetails });

  }
  flatListItemSeparator = () => {
    return (
      <View
        style={styles.itemSeparator}
      />
    );
  }
  changeView = () => {
    (this.state.view == 'Grid') ? this.setState({ numColumns: 2, view: 'linear' }) : this.setState({ numColumns: 1, view: 'Grid' });
  }
  render() {
    const { fetchProductDetails, productDetails, resetProductDetails } = this.props.dashboard;
    const { navigate } = this.props.navigation;
    var radio_props = [
      { label: 'All', value: '' },
      { label: 'Price High to Low', value: 'price_desc' },
      { label: 'Price Low To High', value: 'price_asc' }
    ];
    return (
      <View style={styles.container}>
        <FlatList
          data={productDetails}
          key={this.state.numColumns}
          numColumns={this.state.numColumns}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.flatListItemSeparator}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatListContainer}>
                <TouchableOpacity onPress={() => navigate('ProductDetails', { product_id: item.product_id })}>
                  <Text style={styles.textView}>{item.name}</Text>
                  <Image source={{ uri: item.images }} style={styles.imageView} />
                  <View style={styles.textContainer}>
                    <Text style={styles.textView}> Price - {item.price}</Text>
                    <Text style={styles.textView}> Special Price - {item.special_price}</Text>
                    <Text style={styles.textView}> Discount - {item.save}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          onEndReached={() => {
            fetchProductDetails(this.state.sortProducts);
          }}
        />
        <View>
          <Modal
            animationType={"fade"}
            transparent={false}
            visible={this.state.modelVisible}>
            <View >
              <RadioForm
                radio_props={radio_props}
                initial={0}
                onPress={(value) => {
                  this.setState({ sortProducts: value })
                }}
              />
              <Button title='sort' onPress={() => {
                resetProductDetails();
                fetchProductDetails(this.state.sortProducts);
              }}
              />
              <Button title="Click To Close Modal" onPress={() => {
                this.setState({ modelVisible: false })
              }} />
            </View>
          </Modal>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.setState({ modelVisible: true })} >
              <Text style={styles.btnText}>SORT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.changeView()}
            >
              <Text style={styles.btnText}>{this.state.view} View</Text>
            </TouchableOpacity>
          </View>
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
export default Dashboard;