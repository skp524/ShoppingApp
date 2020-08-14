import React from 'react';
import AppRouter from './src/nav/Navigation'
import 'react-native-gesture-handler';
import { Provider } from 'mobx-react';
import RootStore from './src/stores/RootStore';

const App = () => {
  return (
    <Provider {...RootStore}>
      <AppRouter />
    </Provider>);
};
export default App;
