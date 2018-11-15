import React from "react";
import {ScrollView, YellowBox, Text, View, FlatList, ImageBackground, ActivityIndicator,
    Image, TouchableOpacity, ToastAndroid, StyleSheet, AsyncStorage} from "react-native";
import { WebView } from "react-native-gesture-handler";
import {createMaterialTopTabNavigator} from "react-navigation";
import {StackNavigator} from "react-navigation";
import Formular from "./Formular";
import Register from "./Register";
import App from "../../App";
import NavBar, { NavButton, NavButtonText, NavGroup, NavTitle } from 'react-native-nav';

// YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module.RTCImageLoader"]);

   class Main extends React.Component {
     
    constructor(){
        super() 
        this.state ={
            dataSource:[],
            isLoading: true,
            
        }
    }

    
    

    renderItem = ({item}) =>{
        return(
        <TouchableOpacity style={{flex:1, flexDirection:"row", marginBottom: 3}} 
        onPress={()=> { this.setItemId({item}); this.loadItemId().done(); } }>
            <Image style={{width:80, height:80, margin:5}} 
                source={{uri: item.imagine}} />
                 <View style={{flex:1, justifyContent:"center", marginLeft: 5}}>
                     <Text style={{fontSize: 18, color: "green", marginBottom: 15}}>
                         {item.nume}
                     </Text>
                     <Text style={{fontSize:16, color:"red"}}> 

                         {item.detalii}
                     </Text>
                 </View>
        
        </TouchableOpacity>

        
        );
    }
    setItemId({item}){
        AsyncStorage.setItem("_id", (item._id));
        // var value = await AsyncStorage.getItem("_id");
        //  
    }

    loadItemId = async () => {
        var value = await AsyncStorage.getItem("_id");
        alert(value);
        this.props.navigation.navigate(('Detalii'),{idDetalii: value});
    }

    renderSeparator = () =>{
        return (
            <View style={{height:1, width:"100%", backgroundColor:"black"}}>

            </View>
        );
    }

        componentDidMount(){
            const url = "http://192.168.100.5:4000/venue";
            fetch(url)
            .then((response)=>response.json())
            .then( result => this.setState(
                {dataSource: result, isLoading: false }))
            .catch((error) => {
                console.log(error);
            });   
            
        }

    render(){
        return(
            // this.state.isLoading
            // ?
            // <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            //     <ActivityIndicator size="large" color="#330066" animating />
            // </View>


            <View style={styles.container} >
            <NavBar>
        <NavTitle>
          {"App"}
        </NavTitle>
        <NavGroup>
          <NavButton onPress={() => alert('hi')}>
            <NavButtonText>
              {"Button"}
            </NavButtonText>
          </NavButton>
          <NavButton onPress={() => alert('hi')}>
            <NavButtonText>
              {"Button"}
            </NavButtonText>
          </NavButton>
          <NavButton>
            <NavButtonText>
              {"Button"}
            </NavButtonText>
          </NavButton>
        </NavGroup>
      </NavBar>

                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent = {this.renderSeparator} />
            </View> 
            );
    }
}
export default Main;
const styles = StyleSheet.create({
    container: {
        padding:20,
      flex:1,
      backgroundColor: "#f5fcff",
      
    }
  });