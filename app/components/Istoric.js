import React from "react";
import {ScrollView, Alert, YellowBox, Text, View, FlatList, ImageBackground, ActivityIndicator,
    Image, TouchableOpacity, TouchableHighlight, ToastAndroid, StyleSheet, AsyncStorage, Dimensions, Platform} from "react-native";
    import EvilIcons from "react-native-vector-icons/EvilIcons";
    import FontAwesome from "react-native-vector-icons/FontAwesome";
import Main from "./Main";
import NavBar, { NavButton, NavButtonText, NavGroup, NavTitle } from 'react-native-nav';
import Carousel from 'react-native-snap-carousel';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {Header} from "react-native-elements";
import PopupDialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Font } from 'expo';



class Istoric extends React.Component{
    constructor(){
        super()
        this.state={
            fontLoaded: false,
            dataSource: [],
        }
    }

    renderItem = ({item}) =>{
        var timp = new Date(item.timp_comanda);
        var day = timp.getDate();
        var month = timp.getMonth();
        var year = timp.getFullYear();
        var hour = timp.getHours();
        var minutes = timp.getMinutes();
        console.log(day+" "+month+ " " + year);
        return(
        <View style={styles.container}>
           <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                            backgroundColor:"rgba(255,179,70, 0.7)", height:70, marginBottom: 10}}>
                    <View style={{ marginLeft: 15}}>
                    <View>
                        <Text style={{color:"white", fontSize:18, fontWeight:"bold"}}>
                        <FontAwesome  name="glass" color={"white"} size={14}></FontAwesome> {item.nume_bautura}</Text></View>
                        <View><Text style={{color: "#fff",fontSize:15}}><FontAwesome  name="clock-o" color={"white"} size={15}></FontAwesome> {day}/{month+1}/{year} {hour}:{minutes}</Text></View>
                        <View><Text style={{color: "#fff",fontSize:15}}><EvilIcons name = "location" size={16}/>{item.locatie_bautura}</Text></View>
                        </View>

                        <View style={{marginRight: 15,}}><Image source={{uri: item.imagine_bautura}} style={{ width: 70, height: 70}}></Image></View>
                    </View>
        </View>

        
        );
    }

   async componentDidMount(){
        const {navigation} = this.props;
        console.log(navigation.getParam("user_id", "NO-ID"));
        const url = "https://radiant-beyond-44987.herokuapp.com/users/"+navigation.getParam("user_id", "NO-ID")+"/bautura_comandata";
        fetch(url)
        .then((response)=>response.json())
        .then( result => this.setState(
            {dataSource: result}))
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

                <View style={{margin: 12}}>
            {this.state.fontLoaded ? (<Text style={{color:"#ffb346", fontSize: 20, fontFamily: 'comic-relief'}}>Your last offers :</Text>) : null}
              </View>

            <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={item => item._id} >
            </FlatList>
            </View>
        )
    }
}
export default Istoric;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: "#ee9323",
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