import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import { inject, observer } from 'mobx-react';

@inject('signUp', 'login')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      emailId: '',
      password: '',
      isEmailValid: true,
      isPasswordValid: true,
      signUpMethod: 0,
    }
    this.props.login.getAllUsers();
  }
  validateEmail = () => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    (emailFormat.test(this.state.emailId)) ? this.setState({ isEmailValid: true }) : this.setState({ isEmailValid: false });
  }
  validatePassword = () => {
    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    (passwordFormat.test(this.state.password)) ? this.setState({ isPasswordValid: true }) : this.setState({ isPasswordValid: false })
  }

  validateLogin = () => {
    const { usersDetails, storeCurrentUser } = this.props.login;
    const { navigate } = this.props.navigation;
    if (this.state.emailId == '') {
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
    else {
      const user = usersDetails.find(user => ((user.emailId == this.state.emailId) && (user.password == this.state.password)));
      if (user != null) {
        navigate('Dashboard');
        storeCurrentUser(user);
      }
      else {
        Alert.alert('Enter Valid Email Id & Password');
      }
    }
  }
  validateFBLogin = () => {
    const { usersDetails, storeCurrentUser } = this.props.login;
    const { navigate } = this.props.navigation;
    const { addUser } = this.props.signUp;

    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            fetch('https://graph.facebook.com/v2.5/me?fields=name,email,picture&access_token=' + data.accessToken.toString())
              .then((response) => response.json())
              .then((json) => {
                let userDetails = {
                  imageURI: json.picture.data.url,
                  name: json.name,
                  emailId: json.email,
                  signUpMethod: 1
                }
                const user = usersDetails.find(user => ((user.emailId == userDetails.emailId) && (user.signUpMethod == userDetails.signUpMethod)));
                if (user != null) {
                  storeCurrentUser(user);
                  navigate('Dashboard');
                }
                else {
                  addUser(userDetails);
                  navigate('Dashboard');
                }

              });
          });
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
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
            value={this.state.password}
            onChangeText={(password) => {
              this.setState({ password: password });
              this.validatePassword()
            }}
          />
          {!this.state.isPasswordValid && <Text style={styles.text}>Enter Valid Password</Text>}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.validateLogin()}>
              <Text style={styles.btnText}>
                Login
          </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={styles.btnText}>
                SignUp
          </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconBtn}>
            <Icon.Button
              style={styles.fbBtn}
              onPress={() => this.validateFBLogin()}
              name="facebook">
              <Text style={styles.btnText}>
                Login with Facebook
          </Text>
            </Icon.Button>
            <Icon.Button
              style={styles.gmailBtn}
              name="google">
              <Text style={styles.btnText}>
                Login with Gmail
          </Text>
            </Icon.Button>
          </View>
        </View>
      </View>);

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
    alignItems: 'center',
    marginTop: '30%',
    padding: 10,
  },
  btnContainer: {
    flexDirection: 'row'
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
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  btn: {
    padding: 15,
    alignSelf: 'center',
    backgroundColor: '#349bdc',
    margin: 10,
    borderRadius: 10,
  },
  iconBtn: {
    alignContent: 'space-between'
  },
  fbBtn: {
    backgroundColor: "#3b5998",
    alignSelf: 'center',
    width: 220,
    padding: 15,
  },
  gmailBtn: {
    backgroundColor: '#D44638',
    alignSelf: 'center',
    width: 220,
    padding: 15,
  },
  btnText: {
    color: '#fff',
    fontSize: 18
  }

});
export default Login;