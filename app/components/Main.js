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
import Oferte from "./Oferte";


 YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module.RTCImageLoader"]);


   class Main extends React.Component {
     
    constructor(props){
        super(props) 
        this.state ={
            fontLoaded: false,
            dataSource:[],
            isLoading: true,
            modalVisible: false,
            user_id: 0
            
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

      closeModal() {
        this.setState({modalVisible:false});
      }
    

    renderItem = ({item}) =>{
        const {navigation} = this.props;
        return(
            
            <TouchableOpacity style={{ 
                flex: 1,
                flexDirection: 'row',
                margin: 20, 
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#000',
                borderBottomWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 10, height: 4 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                overflow: "hidden",
            }} 
        onPress={()=> {   
            this.props.navigation.navigate(('Detalii'),
            {itemDetalii: item, 
             user_id: navigation.getParam("user_id", "NO-ID") });
    } }>
               
                <Image borderRadius={20} source={{ uri: item.imagine[0] }} style={styles.imgCard}/>
                <View style={styles.overlay} />
                 <View style={{flex:1, position: "absolute", bottom: 0, left: 0, marginLeft: 5, padding: 20}}>

               
                     <Text style={{fontSize: 23, color: "white", marginBottom: 10}}>
                        {item.nume}
                     </Text>
                     
                     
                         
                     <Text style={{fontSize:16, color:"white", marginBottom: 4}}> 
                     <Icon name = "location-pin" size={16}/> 
                         {item.locatie}
                     </Text>
                    
                     
                
                </View>

        </TouchableOpacity>

        
        );
    }
    
        // alert(value);
    

    renderSeparator = () =>{
        // return (
        //     <View style={{height:1, width:"100%", backgroundColor:"black"}}>

        //     </View>
        // );
    }

       async componentDidMount(){
            const {navigation} = this.props;
            console.log("de aici ar trebui->>"+navigation.getParam("user_id", "NO-ID"));
            const url = "https://radiant-beyond-44987.herokuapp.com/venue";
            var user_id = await AsyncStorage.getItem("user_id");
            this.setState({user_id: user_id});
            fetch(url)
            .then((response)=>response.json())
            .then( result => this.setState(
                {dataSource: result, isLoading: false }))
            .catch((error) => {
                console.log(error);
            });   
            await Font.loadAsync({
                'comic-relief': require('../../assets/fonts/ComicRelief-Bold.ttf'),
              });
              this.setState({ fontLoaded: true });
            
        }

    render(){
        const {navigation} = this.props;
        return(

            
            
            <View style={styles.container} >

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
                        // onPress: () => this.props.navigation.navigate(('User'), {user_id: navigation.getParam("user_id", "NO-ID") } ) }}
                        onPress: () => this.props.navigation.navigate(('User'), {user_id: this.state.user_id } ) }}

                    centerComponent={<LogoTitle/>}
                    rightComponent={{ icon: 'map-o', type: 'font-awesome', color: '#ffcd00', size: 22, top: 0, 
                    onPress: () => {this.setModalVisible(!this.state.modalVisible);} }} 
                    backgroundColor="#fff"
                    leftContainerStyle={{bottom: 100}}
                    outerContainerStyles={{height: 50, borderBottomWidth:0, marginBottom: 0, marginTop: 0}} 
                    containerStyle={{height: 20}}
                    >
                    </Header>
                    <View style={styles.containerSearch}>
                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Search key..."
                    />
                    </View>
               
          
                <FlatList
                
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                   
                    />
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
          source={require('../../assets/logoTestHeader.png')}
          style={{ width: 60, height: 40, top: 10}}
        />
        </View>
      );
    }
  }

//   class UserIcon extends React.Component{
//       render(){
//         const {navigation} = this.props;

//           return(
//               <TouchableOpacity style={{marginBottom: 9}} onPress={()=> {   this.props.navigation.navigate(('User'),{user_id: navigation.getParam("user_id", "NO-ID") });
//             } }>
//                   <FontAwesome  name="user-o" color={"white"} size={31}></FontAwesome>
//               </TouchableOpacity>
//           )
//       }
//   }

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