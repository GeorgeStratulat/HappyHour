import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, 
    TextInput, TouchableOpacity, AsyncStorage, Button, Image } from 'react-native';  
    import FontAwesome from "react-native-vector-icons/FontAwesome";
    import { Font } from 'expo';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: "",
            password: ""
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
          'comic-relief': require('../../assets/fonts/ComicRelief-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: "https://i.imgur.com/Csyw4IL.png"}}/>
                <View style={styles.formular}>
                    <View style={styles.email}>
                    <View style={{marginLeft: 5}}><FontAwesome name="user" color={"white"} size={38}></FontAwesome></View>
                    
                    <TextInput placeholder="Email" style={styles.TextInputUser}></TextInput>
                    </View>

                    <View style={styles.email}>
                    <View style={{paddingRight: 4}}><FontAwesome name="envelope" color={"white"} size={40}></FontAwesome></View>
                    
                    <TextInput placeholder="Email" style={styles.TextInput}></TextInput>
                    </View>

                    <View style={styles.email}>
                    <View style={{marginLeft: 7, marginRight: 10}}><FontAwesome name="lock" color={"white"} size={44}></FontAwesome></View>
                    
                    <TextInput placeholder="Password" style={styles.TextInput}></TextInput>
                    </View>

                    <View style={{marginTop:10, alignItems:"center"}}>
                    <TouchableOpacity style={{backgroundColor:"#fff", width: 160, height: 50, borderWidth: 0, borderRadius: 7}}><View style={styles.facebookContainer}>
                <View>{
    this.state.fontLoaded ? (<Text onPress={()=>this.props.navigation.navigate('Login')} style={{color:"#ffb346", fontSize: 16, fontFamily: 'comic-relief'}}>REGISTER</Text>) : null}</View>
                </View> 
                </TouchableOpacity>
                    </View>
                </View>

                    
                    <View style={{marginTop:22, alignItems:"center"}}>
                    <TouchableOpacity style={{backgroundColor:"#fff", width: 200, height: 50, borderWidth: 0, borderRadius: 7}}><View style={styles.facebookContainer}>
                <View>{
    this.state.fontLoaded ? (<Text onPress={()=>this.props.navigation.navigate('Login')} style={{color:"#ffb346", fontSize: 16, fontFamily: 'comic-relief'}}>LOGIN</Text>) : null}</View>
                </View> 
                </TouchableOpacity>
                    </View>
                    

                <View style={{alignItems:"center", position: 'absolute', bottom:20}}>
                <View style={{flexDirection: 'row'}}><Text>By continuing, you agree to our </Text><Text onPress={() => Linking.openURL('http://google.com')} style={styles.underline}>Terms and Conditions</Text></View>
                <View style={{flexDirection: 'row', }}><Text>and </Text>
                <Text onPress={() => Linking.openURL('http://google.com')} style={styles.underline}>Privacy Policy</Text></View>
            </View>
            </View>
        )
    }
}
export default Register;
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
    email:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop: 25
    },
    formular:{
        marginTop: 20,
        width: "80%",
        height: "38%",
        backgroundColor: "#ffb346",
        borderWidth: 0,
        borderRadius: 7
    
    },
    TextInput:{
        alignSelf:"stretch",
        width: "74%",
        height: 40,
        backgroundColor:"rgba(255,255,255,0.25)",
        color: "white",
    },
    TextInputUser:{
        marginLeft: 10,
        alignSelf:"stretch",
        width: "74%",
        height: 40,
        backgroundColor:"rgba(255,255,255,0.25)",
        color: "white",
    },
    facebookContainer:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        flex:1
    },
    underline: {textDecorationLine: 'underline'},

})