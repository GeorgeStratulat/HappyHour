import React from "react";
import {ScrollView, Alert, YellowBox, Text, View, FlatList, ImageBackground, ActivityIndicator,
    Image, TouchableOpacity, TouchableHighlight, ToastAndroid, StyleSheet, AsyncStorage, Dimensions, Platform} from "react-native";
    import EvilIcons from "react-native-vector-icons/EvilIcons";
    import FontAwesome from "react-native-vector-icons/FontAwesome";
import Main from "./Main";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

import NavBar, { NavButton, NavButtonText, NavGroup, NavTitle } from 'react-native-nav';
import Carousel from 'react-native-snap-carousel';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {Header} from "react-native-elements";
import PopupDialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Font } from 'expo';


class Cumpara_Abonament extends React.Component{
    constructor(){
        super()
        this.state={
            dataSource:[],
            fontLoaded: true
        }
    }

    async componentDidMount(){
        const {navigation} = this.props;
        console.log(navigation.getParam("user_id", "NO-ID"));
        const url = "https://radiant-beyond-44987.herokuapp.com/abonamente";
        console.log(url);
        fetch(url)
        .then((response)=>response.json())
        .then( result => this.setState(
            {dataSource: result }))
        .catch((error) => {
            console.log(error);
        });   
        await Font.loadAsync({
            'comic-relief': require('../../assets/fonts/ComicRelief-Bold.ttf'),
          });
          this.setState({ fontLoaded: true });
        
    }

    renderItem = ({item}) =>{
        const {navigation} = this.props;

        return(
            <View>
                <Card style={{ 
                              flex: 1,
                              margin: 20, 
                              borderRadius: 20,
                              borderWidth: 0,
                              borderColor: '#000',
                              borderBottomWidth: 0,
                              shadowColor: '#000',
                              shadowOffset: { width: 10, height: 4 },
                              shadowOpacity: 0.8,
                              shadowRadius: 2,
                              overflow: "hidden",
                              alignItems:"center"
                          }} >
          <CardImage 
            source={{uri: item.imagine_abonament}} 
            title={item.nume_abonament}
            
          />
          <CardContent>
              
            <View>
            {this.state.fontLoaded ? (<Text style={{color:"#ffb346", fontSize: 17, fontFamily: 'comic-relief'}}>Abonamentul ala blanao</Text>) : null}
              </View>

          <View>
            {this.state.fontLoaded ? (<Text style={{color:"#ffb346", fontSize: 17, fontFamily: 'comic-relief'}}>Buy a coffee and get one free</Text>) : null}
            </View>
            <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
           
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            {this.state.fontLoaded ? (<Text style={{color:"#ffb346", fontSize: 17, fontFamily: 'comic-relief'}}></Text>) : null}
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            {this.state.fontLoaded ? (<Text style={{color:"#ffb346", fontSize: 17, fontFamily: 'comic-relief'}}> <FontAwesome name="smile-o" color={"#ffb346"} size={18}></FontAwesome></Text>) : null}
            </View>
            
            </View>
            
          </CardContent>
          <CardAction 
            separator={true} 
            inColumn={false}
            style={{justifyContent:"center"}}
            >
            
            <CardButton
              title="Get it now"
              color="#FEB557"
            />
          </CardAction>
        </Card>
        
        </View>

            // <View>
            //     <Image style={{width:"70%", height: 300, marginBottom: 10}} source={{uri: item.imagine_abonament}}></Image>
            //     <Text>{item.nume_abonament}</Text>
            //     <Text>{item.numar_bauturi}</Text>
            //     <Text>{item.numar_luni}</Text>
            //     <TouchableHighlight onPress={()=> {
            //         Alert.alert(
            //             'Colecteaza',
            //             'Esti pe cale sa cumperi abonamentul. Continui?',
            //             [
            //               {text: 'Da', onPress: () => {

            //                 fetch("https://radiant-beyond-44987.herokuapp.com/abonament_user/addAbonament_User" , {
            //                 method: "POST",
            //                 mode: "cors",
            //                 headers:{
            //                     "Accept": "application/json",
            //                     "Content-Type": "application/json"
            //                 },
            //                 body : JSON.stringify({
            //                     "user_id": navigation.getParam("user_id", "NO-ID"),
            //                     "tip_abonament": item._id
            //                 })
            //             }).then((response) => response.json()).then((res) => {
            //                     if(res){
            //                         console.log("a mers cica");
            //                     }else{
            //                         alert("it's from here");
            //                         alert(res.message);
            //                     }}).done(); 

            //                     }
            //                 },

            //               {text: 'Nu', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            //             ],
            //             { cancelable: false }
            //           )}}
            //      style={{marginTop: 5, width: 35,backgroundColor:"#fbd22c", justifyContent: 'center', alignItems: 'center' }}><Text style={{color:"white", fontSize: 12}} >Cumpara</Text></TouchableHighlight>

            // </View>
        )
    }

    renderSeparator = () =>{
        return (
            <View style={{height:1, width:"100%", backgroundColor:"black"}}>

            </View>
        );
    }

    

    render(){
        const {navigation} = this.props;
        console.log(this.state.dataSource)
        return(
            <View style={styles.container}>
            <Header
                    leftComponent={{
                        style: {
                            paddingBottom: 15,
                            marginBottom: 15,
                        },
                        icon: 'md-arrow-round-back', type: "ionicon", color: '#ffcd00', size: 24, top: 0, onPress: () => this.props.navigation.navigate(('User'), {user_id: navigation.getParam("user_id", "NO-ID") })
                    }}
                    centerComponent={<LogoTitle />}
                    // rightComponent={{ icon: 'md-arrow-round-forward', type: "ionicon", color: '#ffcd00', size: 24, top: 0, onPress: () => this.props.navigation.navigate(('User'), {user_id: navigation.getParam("user_id", "NO-ID") }) }}
                    backgroundColor="#fff"
                    leftContainerStyle={{ bottom: 100 }}
                    outerContainerStyles={{ height: 50, borderBottomWidth: 0, marginBottom: 0, marginTop: 0 }}
                    containerStyle={{ height: 20 }}
                >
                </Header>
            
            <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
                ItemSeparatorComponent = {this.renderSeparator} />

            </View>
        )
    }
}

export default Cumpara_Abonament;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'stretch' 
    },
    header:{
        fontSize:38,padding: 20,
    color:"#fff",
    fontWeight:"bold"
    }
    
})
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