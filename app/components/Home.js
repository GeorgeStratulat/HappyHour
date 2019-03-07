import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, TextInput,
   TouchableOpacity, Button, NavigatorIOS, AsyncStorage} from 'react-native';
import {StackNavigator,
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
  } from 'react-navigation';

import Oferte from "./Oferte";
import Main from "./Main";
import Detalii from "./Detalii";
import User from "./User";
import Istoric from "./Istoric";
import Cumpara_Abonament from "./Cumpara_Abonament";
import Support from "./Support";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


  
class Home extends React.Component {
   async componentDidMount(){
        const {navigation} = this.props;
        console.log("user_id === "+navigation.getParam("user_id", "NO-ID"));
        AsyncStorage.setItem("user_id", navigation.getParam("user_id", "NO-ID"));
        console.log("teoretic.... asyncy.. "+JSON.stringify(await AsyncStorage.getItem("user_id")));
        
    }

    render() {
        return (
          
    
          <TabNavigator/>
    
           
        );
      }
      
      
}
export default Home;

const styles = StyleSheet.create({
	tab: {
		padding: 5
	},
	indicator: {
		width: 0,
		height: 0
	},
	label: {
		fontSize: 10
	},
	icon: {
		width: 20,
		height: 20,
		backgroundColor: "green"
	},
	tabBar: {
		backgroundColor: "#f2f2f2",
	}
});

const MainStack =  createStackNavigator({
    Main : {screen: Main, navigationOptions:{ header: null}},
    Detalii : {screen: Detalii, navigationOptions:{ header: null}},
    User: {screen: User, navigationOptions: {header: null}, params: { user_id: AsyncStorage.getItem("user_id") } },
    Istoric:{screen: Istoric, navigationOptions:{header: null}},
    Cumpara_Abonament:{screen: Cumpara_Abonament, navigationOptions:{header: null}},
    Support:{screen: Support, navigationOptions:{header:null}}
  });

  const OferteStack = createStackNavigator({
    Oferte: { screen: Oferte },
  });

const TabNavigator = createBottomTabNavigator({
    
    Oferte: { screen: OferteStack,
        
        navigationOptions: ({ navigation }) => ({
            title: "Oferte",
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="glass-cocktail" color={"#ffb346"} size={23}></MaterialCommunityIcons>
        }) 
    },
    Main: { screen: MainStack,
        navigationOptions: ({ navigation }) => ({
            title: "Restaurante",
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="food-fork-drink" color={"#ffb346"} size={23}></MaterialCommunityIcons>
        }) },
  },
  {
    initialRouteName: "Oferte",
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    order: ["Oferte", "Main"],
    backBehavior: "initialRoute",
    tabBarOptions: {
        activeTintColor: "#ffb346",
        inactiveTintColor: "#ffb346",
        showLabel: true,
        showIcon: true,
        upperCaseLabel: false,
        pressColor: "black",
        scrollEnabled: false,
        tabStyle: styles.tab,
        indicatorStyle: styles.indicator,
        labelStyle: styles.label,
        iconStyle: styles.icon,
        style: styles.tabBar
    }
}
  );