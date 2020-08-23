import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import Geocoder from 'react-native-geocoding';
import { inject, observer } from 'mobx-react';

@inject('checkOut')
@observer
class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      latitude: 0,
      longitude: 0,
    }
    this.props.checkOut.getCurrentUser();
  }
  componentDidMount() {
    // Geolocation.getCurrentPosition(info =>
    //   this.setState({ latitude: info.coords.latitude, longitude: info.coords.longitude }));
    // Geocoder.init("AIzaSyC1txyUHpqQlZh8GQ3VYS1IW6k7JC-eMNw");
    // Geocoder.from("Colosseum")
    //   .then(json => {
    //     var location = json.results[0].geometry.location;
    //     console.log(location);
    //   })
    //   .catch(error => console.warn(error));
    // Geocoder.from(20.5937, 78.9629)
    //   .then(json => {
    //     var addressComponent = json.results[0].address_components;
    //     console.log(JSON.stringify(addressComponent));
    //   })
    //   .catch(error => console.warn(error));
  }
  render() {
    const { deleteCartProducts, currentUserEmailId } = this.props.checkOut;
    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}
            onPress={() =>
              deleteCartProducts(currentUserEmailId)
            }
          >
            <Text style={styles.btnText}>Deliver This Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
          >
            <Text style={styles.btnText}>Edit Address</Text>
          </TouchableOpacity>
        </View>
      </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3f7ca3',
    height: '100%'
  },
  btnContainer: {
    flexDirection: 'row'
  },
  btn: {
    padding: 15,
    alignSelf: 'center',
    backgroundColor: '#349bdc',
    margin: 10,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18
  }

});
export default CheckOut;