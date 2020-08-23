import React, { Component } from 'react';
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { inject, observer } from 'mobx-react';

@inject('signUp')
@observer
class SignUp extends Component {
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
      isNameValid: true,
      isEmailValid: true,
      isPasswordValid: true,
      passwordMatch: true,
    }
  }

  imagePicker = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imageURI: (response.fileSize > 2000000) ? Alert.alert('Image Size must be less than 2 mb') : response.uri,
        });
      }
    });
  }
  validateName = () => {
    const nameFormat = /^[a-zA-Z]+$/;
    (nameFormat.test(this.state.name)) ? this.setState({ isNameValid: true }) : this.setState({ isNameValid: false });
  }
  validateEmail = () => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    (emailFormat.test(this.state.emailId)) ? this.setState({ isEmailValid: true }) : this.setState({ isEmailValid: false });
  }
  validatePassword = () => {
    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    (passwordFormat.test(this.state.password)) ? this.setState({ isPasswordValid: true }) : this.setState({ isPasswordValid: false });
  }
  passwordMatch = () => {
    ((((this.state.password).localeCompare(this.state.confirmPassword))) == 0) ? this.setState({ passwordMatch: true }) : this.setState({ passwordMatch: false });
  }
  registerUser = () => {
    const { addUser } = this.props.signUp;
    if (!this.state.isNameValid) {
      Alert.alert("Email Id is Mandatory");
    }
    else if (this.state.emailId == '') {
      Alert.alert("Email Id is Mandatory");
    }
    else if (!this.state.isEmailValid) {
      Alert.alert("Enter Valid Email ")
    }
    else if (this.state.password == '') {
      Alert.alert("Password is Mandatory");
    }
    else if (!this.state.isPasswordValid) {
      Alert.alert("Enter Valid  Password")
    }
    else if (this.state.confirmPassword == '') {
      Alert.alert("Confirm Your Password")
    }
    else if (!this.state.passwordMatch) {
      Alert.alert('Password is not Match')
    }
    else {
      userDetails = {
        imageURI: this.state.imageURI,
        name: this.state.name,
        mobileNo: this.state.mobileNo,
        emailId: this.state.emailId,
        password: this.state.password,
        signUpMethod: this.state.signUpMethod
      }
      addUser(userDetails);
    }
  }
  render() {

    return (
      < View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.imagePicker()}
        >
          <Image
            style={styles.imagePicker}
            source={require('../assets/add-photo.png')}
          ></Image>
        </TouchableOpacity>
        <View style={styles.innerContainer}>
          <TextInput
            placeholder='Enter Your Name'
            style={styles.inputText}
            value={this.state.name}
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
            value={this.state.mobileNo}
            onChangeText={(mobileNo) =>
              this.setState({ mobileNo: mobileNo })}
          />
          <TextInput
            placeholder='Enter Your Email Id'
            style={styles.inputText}
            value={this.state.emailId}
            onChangeText={(emailId) => {
              this.setState({ emailId: emailId });
              this.validateEmail();
            }}
          />
          {!this.state.isEmailValid && <Text style={styles.text}>Enter Valid Email Id</Text>}
          <TextInput
            placeholder='Enter Your Password'
            style={styles.inputText}
            secureTextEntry
            onBlur={() => this.passwordMatch()}
            value={this.state.password}
            onChangeText={(password) => {
              this.setState({ password: password });
              this.validatePassword();

            }}
          />
          {!this.state.isPasswordValid && <Text style={styles.text}>Enter Valid Password</Text>}
          <TextInput
            placeholder='Confirm Password'
            style={styles.inputText}
            secureTextEntry
            value={this.state.confirmPassword}
            onBlur={() => this.passwordMatch()}
            onChangeText={(confirmPassword) => {
              this.setState({ confirmPassword: confirmPassword });
            }} />
          {!this.state.passwordMatch && <Text style={styles.text}>Password is Not Match</Text>}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.registerUser()
            }}
          >
            <Text style={styles.btnText}>SignUp</Text>
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
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
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
export default SignUp;