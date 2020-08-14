import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

@inject('counter')
@observer
class Counter extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const { counter, increaseCounter, decreaseCounter } = this.props.counter;
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => decreaseCounter()}
            style={styles.btn}>
            <MaterialIcons name="remove" size={40} />
          </TouchableOpacity>
          <Text style={styles.counter}>{counter}</Text>
          <TouchableOpacity onPress={() => increaseCounter()} style={styles.btn}>
            <MaterialIcons name="add" size={40} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  btn: {
    borderWidth: 1,
    borderColor: '#000'
  },
  counter: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 7,
    paddingTop: 3,
    color: '#fff',
    fontSize: 26
  }
});
export default Counter;