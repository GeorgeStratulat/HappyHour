import React from "react";
import {ScrollView, YellowBox, Text, View, FlatList, ImageBackground, ActivityIndicator,
    Image, TouchableOpacity, ToastAndroid, StyleSheet, AsyncStorage} from "react-native";
import NavBar, { NavButton, NavButtonText, NavGroup, NavTitle } from 'react-native-nav';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {Header, ListItem} from "react-native-elements";
import FullWidthImage from 'react-native-fullwidth-image'

 YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module.RTCImageLoader"]);

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
        <TouchableOpacity style={{flex: 1, flexDirection:"row",marginBottom: 3}} 
        onPress={()=> {   this.props.navigation.navigate(('Detalii'),{itemDetalii: item});
    } }>
            <ImageBackground style={{ width:"100%", height:275, marginBottom: 15}} source={{uri: item.imagine}} >

                 <View style={{flex:1, position: "absolute", bottom: 0, left: 0, marginLeft: 5}}>

               
                     <Text style={{fontSize: 23, color: "white", marginBottom: 10}}>
                        {item.nume}
                     </Text>
                     
                     
                         
                     <Text style={{fontSize:16, color:"white", marginBottom: 4}}> 
                     <Icon name = "location-pin" size={16}/> 
                         {item.locatie}
                     </Text>
                    
                     
                 </View>
                 </ImageBackground>
        </TouchableOpacity>

        
        );
    }
    
        // alert(value);
    

    renderSeparator = () =>{
        return (
            <View style={{height:1, width:"100%", backgroundColor:"black"}}>

            </View>
        );
    }

        componentDidMount(){
            const url = "https://radiant-beyond-44987.herokuapp.com/venue";
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
            <View style={styles.container} >
            <Header
            leftComponent={{ icon: 'user-o', type: "font-awesome", color: '#fff', size: 31, marginBottom: 10 }}
            centerComponent={<LogoTitle/>}
            rightComponent={{ icon: 'settings', color: '#fff', size: 36, marginBottom: 8 }} 
            backgroundColor="#ee9323"
           outerContainerStyles={{height: 85, borderBottomWidth:0, marginBottom: -11, marginTop: 15}} 
/>
          
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

class LogoTitle extends React.Component {
    render() {
      return (
        <View style={{ }} >
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 60, height: 60, bottom: 0}}
        />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ee9323",
      alignSelf: 'stretch',
    
      
    },
    navBar: {
        height: 80,

    },
    navTitle:{
        textAlign:"center"
    },
    navProfile:{

    },
    navSettings:{

    }
  });