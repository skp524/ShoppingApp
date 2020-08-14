import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { inject, observer } from 'mobx-react';

@inject('profile')
@observer
class Profile extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      imageURI: '',
      name: '',
      mobileNo: '',
      emailId: '',
      password: '',
      confirmPassword: '',
      signUpMethod: 0,
      editable: false,
      isNameValid: true
    }
    this.getCurrentUser();
  }
  validateName = () => {
    const nameFormat = /^[a-zA-Z]+$/;
    (nameFormat.test(this.state.name)) ? this.setState({ isNameValid: true }) : this.setState({ isNameValid: false });
  }
  getCurrentUser = async () => {
    const { getUser, userDetails } = this.props.profile;
    try {
      const emailId = await AsyncStorage.getItem('loginAccessToken')
      if (emailId !== null) {
        getUser(emailId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { updateUser, userDetails } = this.props.profile;
    return (
      < View style={styles.container}>
        <Image
          style={styles.imagePicker}
          source={require('../assets/add-photo.png')}
        />
        <View style={styles.innerContainer}>
          <TextInput
            placeholder='Enter Your Name'
            style={styles.inputText}
            value={(this.state.editable) ? this.state.name : userDetails.name}
            editable={this.state.editable}
            onChangeText={(name) => {
              this.setState({ name: name });
              this.validateName();
            }}
          />
          {!this.state.isNameValid && <Text style={styles.text}>Name Contains Text Only</Text>}
          <TextInput
            placeholder='Enter Your Mobile No'
            style={styles.inputText}
            keyboardType='phone-pad'
            editable={false}
            value={userDetails.mobileNo}
          />
          <TextInput
            placeholder='Enter Your Email Id'
            style={styles.inputText}
            value={userDetails.emailId}
            editable={false}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                (userDetails.signUpMethod == 0) ? this.setState({ editable: true }) : Alert.alert("Social User can not Edit Details")}
            >
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              disabled={!this.state.editable}
              onPress={() => {

                if (this.state.name == '') {
                  Alert.alert("Enter the Name")
                }
                else if (userDetails.signUpMethod == 1) {
                  Alert.alert("Social User can not Edit Details")
                }
                else if (!this.state.isNameValid) {
                  Alert.alert("Enter Valid Name")
                }
                else {
                  userDetail = {
                    emailId: userDetails.emailId,
                    name: this.state.name
                  }
                  updateUser(userDetail)
                  Alert.alert("Data Update Sucessfull")
                }
              }}
            >
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
          </View>
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
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  imagePicker: {
    width: 150,
    height: 150
  },
  inputText: {
    width: 300,
    borderWidth: 1,
    borderColor: '#349bdc',
    margin: 10,
    borderRadius: 10,
    fontSize: 18
  },
  text: {
    fontSize: 16,
    marginLeft: 15,
    color: 'red'
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
export default Profile;