import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, 
    TextInput, TouchableOpacity, AsyncStorage, Button, Image } from 'react-native';  
    import FontAwesome from "react-native-vector-icons/FontAwesome";
    import { Font } from 'expo';

class Intro extends React.Component{
    constructor(props ){
        super(props );
         this.state = {fontLoaded: false};
    }
    async componentDidMount() {
        const {navigation} = this.props;
        await Font.loadAsync({
          'comic-relief': require('../../assets/fonts/ComicRelief-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    render(){
        return(
            <View style={styles.container}>
            <Image style={styles.image} source={{uri: "https://i.imgur.com/Csyw4IL.png"}}/>
            <View>
                <View style={{alignItems:"center", marginTop: 20, marginBottom: 5}}><Text style={{fontSize: 17}}>Login with</Text></View>

                <TouchableOpacity style={styles.facebook}><View style={styles.facebookContainer}>
                <View style={{paddingRight: 7}}><FontAwesome name="facebook-square" color={"white"} size={22}></FontAwesome></View>
                <View>{
    this.state.fontLoaded ? (<Text style={{color:"white", fontSize: 15, fontFamily: 'comic-relief'}}>LOGIN WITH FACEBOOK</Text>) : null}</View>
                </View> 
                </TouchableOpacity>

                <View style={{alignItems:"center", marginBottom: 2}}><Text>or</Text></View>
                <TouchableOpacity style={{backgroundColor:"#ffb346", width: 240, height: 60, borderWidth: 0, borderRadius: 7}}><View style={styles.facebookContainer}>
                <View>{
    this.state.fontLoaded ? (<Text onPress={()=>this.props.navigation.navigate('Register')} style={{color:"white", fontSize: 15, fontFamily: 'comic-relief'}}>REGISTER WITH EMAIL</Text>) : null}</View>
                </View> 
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 50}}>
            <TouchableOpacity style={{backgroundColor:"#fff", width: 200, height: 50, borderWidth: 0, borderRadius: 7}}><View style={styles.facebookContainer}>
                <View>{
    this.state.fontLoaded ? (<Text onPress={()=>this.props.navigation.navigate('Login')} style={{color:"#ffb346", fontSize: 16, fontFamily: 'comic-relief'}}>LOGIN WITH EMAIL</Text>) : null}</View>
                </View> 
                </TouchableOpacity>
            </View>
            <View style={{alignItems:"center", position: 'absolute', bottom:20}}>
                <View style={{flexDirection: 'row'}}><Text>By continuing, you agree to our </Text><Text onPress={() => Linking.openURL('http://google.com')} style={styles.underline}>Terms and Conditions</Text></View>
                <View style={{flexDirection: 'row', }}><Text>and </Text>
                <Text onPress={() => Linking.openURL('http://google.com')} style={styles.underline}>Privacy Policy</Text></View>
            </View>
            </View>
        ); 
    }
}

export default Intro;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    image: {
        top: 18,
        width: "70%",
        height: "40%"
    },
    underline: {textDecorationLine: 'underline'},
    facebook:{
        backgroundColor:"#3b5998",
        width: 240,
        height: 60,
        borderWidth: 1,
        borderRadius: 7
        
    },
    facebookContainer:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        flex:1
    }
})