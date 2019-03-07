
import React from "react";
import {Alert, ScrollView, YellowBox, Text, View, FlatList, ImageBackground, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet, AsyncStorage, TextInput, Image,
Modal} from "react-native";
import NavBar, { NavButton, NavButtonText, NavGroup, NavTitle } from 'react-native-nav';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Icon from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Header, ListItem} from "react-native-elements";
import FullWidthImage from 'react-native-fullwidth-image';
import { MapView, Marker, Font } from 'expo';

class Oferte extends React.Component{
    constructor(){
        super() 
        this.state ={
            fontLoaded: false,
            dataSource:[],
            isLoading: true,
            modalVisible: false,
            
        }
    }

    async componentDidMount(){
        const {navigation} = this.props;
        // console.log(navigation.getParam("user_id", "NO-ID"));
        // const url = "https://radiant-beyond-44987.herokuapp.com/venue";
        // fetch(url)
        // .then((response)=>response.json())
        // .then( result => this.setState(
        //     {dataSource: result, isLoading: false }))
        // .catch((error) => {
        //     console.log(error);
        // });   
        await Font.loadAsync({
            'comic-relief': require('../../assets/fonts/ComicRelief-Bold.ttf'),
          });
          this.setState({ fontLoaded: true });
        
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

      closeModal() {
        this.setState({modalVisible:false});
      }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>

            <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.closeModal();}}
           >

            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080'}}>
                 <View style={{ width: "88%",height: "85%",  backgroundColor: "white", alignItems:"center"}}>
                 <View style={{position:"absolute", right: 6, top:0}}><TouchableOpacity onPress={()=>this.closeModal()} ><FontAwesome name="times" color={"#ffb346"} size={23}></FontAwesome></TouchableOpacity></View>
                 <View style={{marginTop: 18}}>{
                this.state.fontLoaded ? (<Text style={{color:"#ffb346", fontSize: 16, fontFamily: 'comic-relief'}}>Aici puteti vedea toate locatiile partenere</Text>) : null}</View>
                 <MapView 
        style={{position: 'absolute', bottom:10, width: "95%", height:"90%"}}
        initialRegion={{
          latitude: 44.443189,
          longitude: 26.096726,
          latitudeDelta: 0.0102,
          longitudeDelta: 0.00451,
        }}>
        <MapView.Marker coordinate={{latitude: 44.443189,
          longitude: 26.096726}}>
          <Image style={{width: 20, height:20}} source={require("../../assets/happy_user2.png")}></Image>
          <Text style={{color:"black", fontWeight: "bold"}}>M60</Text>
          </MapView.Marker>
        </MapView>  
                </View>
            </View>
          </Modal>

          <Header
                    leftComponent={{
                        style: {
                            paddingBottom: 10,
                            marginBottom: 10,
                        }, 
                        icon: 'user-o', type: "font-awesome", color: '#ffcd00', size: 20,  
                        onPress: () => this.props.navigation.navigate(('User'), {user_id: navigation.getParam("user_id", "NO-ID") } ) }}
                    centerComponent={<LogoTitle/>}
                    rightComponent={{ icon: 'map-o', type: 'font-awesome', color: '#ffcd00', size: 22, top: 0, 
                    onPress: () => {this.setModalVisible(!this.state.modalVisible);} }} 
                    backgroundColor="#fff"
                    leftContainerStyle={{bottom: 100}}
                    outerContainerStyles={{height: 50, borderBottomWidth:0, marginBottom: 0, marginTop: 0}} 
                    containerStyle={{height: 20}}
                    >
                    </Header>

            </View>
        );
      }
}

export default Oferte;

class LogoTitle extends React.Component {
    render() {
      return (
        <View style={{ }} >
        <Image
          source={require('../../assets/logoTestHeader.png')}
          style={{ width: 60, height: 40, top: 10}}
        />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    imgCard:{
        
        width: "100%", height: 254
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    inputSearch:{
        borderBottomColor: "#ffcd00",
        borderBottomWidth: 2,
    },
    containerSearch:{
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
    },  
    container: {
      flex: 1,
      backgroundColor: "#fff",
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