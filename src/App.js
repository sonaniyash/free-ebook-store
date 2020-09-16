import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './navigations/app-navigation';
import SplashScreen from 'react-native-splash-screen';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    SplashScreen.hide();
  }

  render(){
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  }
}

export default App;
