import React from "react";
import {ScrollView, Alert, YellowBox, Text, View, FlatList, ImageBackground, ActivityIndicator,
    Image, TouchableOpacity, TouchableHighlight, ToastAndroid, StyleSheet, AsyncStorage, Dimensions, Platform, Linking} from "react-native";
import { Button } from 'react-native-elements';
    import EvilIcons from "react-native-vector-icons/EvilIcons";
    import FontAwesome from "react-native-vector-icons/FontAwesome";
import Main from "./Main";
import NavBar, { NavButton, NavButtonText, NavGroup, NavTitle } from 'react-native-nav';
import Carousel from 'react-native-snap-carousel';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {Header} from "react-native-elements";
import PopupDialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';

class Support extends React.Component{
    constructor(){
        super()
        this.state={
            
        }

    }


    render(){
        
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
            {/* <Header
            leftComponent={{ icon: 'settings', color: '#fff', size: 36, marginBottom: 0} }
            // centerComponent={{ text: 'HAPPY HOUR', style: { color: '#fff' } }}
            centerComponent={<LogoTitle/>}
            rightComponent={{icon: 'md-arrow-round-forward', type: "ionicon", color: '#fff', size: 36, marginBottom: 40,
            onPress: () => this.props.navigation.navigate(('Main'))}}
           backgroundColor="#ee9323"
            
           outerContainerStyles={{height: 85, borderBottomWidth:0, marginBottom: -11, marginTop: 15}} 
           /> */}

<View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center', 
                                backgroundColor: "rgba(255,179,70, 0.7)", height: 70, paddingBottom: 15, marginTop: 20, marginBottom: 2}}> 
                    <TouchableOpacity onPress={()=> Linking.openURL("https://happy-site.firebaseapp.com/public/html/faq.html")} style={{ marginLeft: 15, }}><Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}>Intrebari adresate frecvent</Text></TouchableOpacity>
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center', 
                                backgroundColor: "rgba(255,179,70, 0.7)", height: 70, paddingBottom: 15, marginTop: 2, marginBottom: 2}}> 
                    <View style={{ marginLeft: 15, }}><Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}>Termeni si conditii</Text></View>
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center', 
                                backgroundColor: "rgba(255,179,70, 0.7)", height: 70, paddingBottom: 15, marginTop: 2, marginBottom: 2}}> 
                    <View style={{ marginLeft: 15, }}><Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}>Contacteaza-ne</Text></View>
                </View>
        
            </View>
        )
    }

}
export default Support;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'stretch' 
    },
    header:{
        fontSize:38,padding: 20,
        color:"#ee9323",
    fontWeight:"bold"
    }
    
})
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
