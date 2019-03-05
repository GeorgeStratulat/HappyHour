import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, TextInput,
   TouchableOpacity, Button, NavigatorIOS, AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Formular from "./app/components/Formular";
import Main from "./app/components/Main";
import Register from "./app/components/Register";
import Detalii from "./app/components/Detalii";
import User from "./app/components/User";
import Istoric from "./app/components/Istoric";
import Cumpara_Abonament from "./app/components/Cumpara_Abonament";
import Support from "./app/components/Support";
import Intro from "./app/components/Intro";
import Login from "./app/components/Login";


export default class App extends React.Component {

  
  render() {
    return (
      

      <AppNavigator/>

       
    );
  }
  
}

const AppNavigator = createStackNavigator({
  Intro: { screen: Intro, navigationOptions: {
    header: null // Will hide header for HomePage
} },
Login: { screen: Login, navigationOptions: {
  header: null // Will hide header for HomePage
} },
  Formular: { screen: Formular, navigationOptions: {
    header: null // Will hide header for HomePage
} },
  
Register : {screen: Register, navigationOptions: {
  header: null // Will hide header for HomePage
}},
Main : {screen: Main, navigationOptions:{ header: null}},
Detalii : {screen: Detalii, navigationOptions:{header: null}},
User: {screen: User, navigationOptions: {header: null} },
Istoric:{screen: Istoric, navigationOptions:{header: null}},
Cumpara_Abonament:{screen: Cumpara_Abonament, navigationOptions:{header: null}},
Support:{screen: Support, navigationOptions:{header:null}}

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:null,
    alignSelf:"stretch",
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper:{
    flex: 1
  },
  header:{
    fontSize:38,padding:20,
    color:"#fff",
    fontWeight:"bold"
  },
  formContainer:{
    alignSelf: "stretch",
    paddingLeft: 20,
    paddingRight:20
},
TextInput:{
    alignSelf:"stretch",
    padding:20,
    backgroundColor:"rgba(255,255,255,0.7)",
    marginBottom:20
},
button:{
    alignSelf:"stretch",
    marginTop: 20,
    backgroundColor:"rgba(0,0,0,0.7)",
    alignItems:"center",
    padding:20,
  
},
btntext:{
    color:"#fff",
    fontSize:18
}
});
