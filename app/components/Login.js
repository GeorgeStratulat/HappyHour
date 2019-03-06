import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, 
    TextInput, TouchableOpacity, AsyncStorage, Button, Image, Modal } from 'react-native';  
    import FontAwesome from "react-native-vector-icons/FontAwesome";
    import { Font } from 'expo';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {modalVisible: false, modal2Visible: false, fontLoaded: false, email: "", password: "", id_user: "", isUserLoggedIn: false, userInfo:"", emailSent: ""};
    }

    async componentDidMount() {
        await Font.loadAsync({
          'comic-relief': require('../../assets/fonts/ComicRelief-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });

        var value = AsyncStorage.getItem('email');
        value.then((e) => {
            this.setState({
                id_user: e,
                userInfo:"",
                picture:"",
                modalVisible: false,
                modal2Visible: false
            })
        })
        .then(() => {
           if(this.state.id_user!== undefined && this.state.id_user!== null && this.state.id_user!=""){
               this.props.navigation.navigate(('Main'), { user_id: this.state.id_user });
           }
        })
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

      closeModal() {
        this.setState({modalVisible:false});
      }

      setModalVisible2(visible) {
        this.setState({modal2Visible: visible});
      }

      closeModal2() {
        this.setState({modal2Visible:false});
      }

    login(){
        if(this.state.email!="" && this.state.password!=""){
            fetch("https://radiant-beyond-44987.herokuapp.com/users/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": this.state.email,
                    "parola": this.state.password
                })
            }
            ).then((response) => response.json()).then((res) => {
    
                if (res.success === true) {
                    var email = res.message;
                    var login = true;
                    AsyncStorage.setItem("email", email);
                    this.setState(
                        {
                            id_user: res.message,
                            isUserLoggedIn: login
                        });
                } else {
    
                    alert("Something went wrong!");
                }
            }).then(() => {
                if (this.state.isUserLoggedIn) {
                    this.props.navigation.navigate(('Main'), { user_id: this.state.id_user });
                }
            })
                .done();
        }else{
            alert("Te rugam completeaza campurile. Multumim!")
        }
       
      }

    render(){
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
                 <View style={{ width: "88%",height: "40%",  backgroundColor: "white", alignItems:"center"}}>
                 <View style={{position:"absolute", right: 6, top:0}}><TouchableOpacity onPress={()=>{this.closeModal(); this.setState({emailSent:""})}} ><FontAwesome name="times" color={"#ffb346"} size={23}></FontAwesome></TouchableOpacity></View>
                 <View style={{marginTop: 27, marginLeft: 10, marginRight: 10}}>{
    this.state.fontLoaded ? (<View>
        <Text style={{color:"#ffb346", fontSize: 16, fontFamily: 'comic-relief'}}>Va rugam sa va introduceti adresa de email de pe care v-ati creat contul.</Text>
        <Text style={{color:"#ffb346", fontSize: 16, fontFamily: 'comic-relief'}}>Noi va vom trimite in cel mai scurt timp un email pentru a va crea o parola noua!</Text>
        <View style={styles.email}>
                    <View style={{paddingRight: 4}}><FontAwesome name="envelope" color={"#ffb346"} size={42}></FontAwesome></View>
                    <TextInput onChangeText={(emailSent)=> this.setState({emailSent})} value={this.state.emailSent}
                     placeholder="Email" style={styles.TextInputForm}></TextInput>
                    </View>
        <View style={styles.facebookContainer}>
        <TouchableOpacity onPress={()=>{this.closeModal(); this.setModalVisible2(!this.state.modal2Visible) }}  style={{justifyContent:"center", alignItems:"center", backgroundColor:"#ffb346", width: 160, height: 50, borderWidth: 0, borderRadius: 7}}>
        <Text style={{color:"#fff", fontSize: 14, fontFamily: 'comic-relief'}}>SEND EMAIL</Text>
        </TouchableOpacity></View>
        </View>) : null}</View>
                
                </View>
            </View>
          </Modal>

          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal2Visible}
          onRequestClose={() => {
            this.closeModal2();}}
           >

            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080'}}>
                 <View style={{ width: "88%",height: "25%",  backgroundColor: "white", alignItems:"center"}}>
                 <View style={{position:"absolute", right: 6, top:0}}><TouchableOpacity onPress={()=>{this.closeModal2(); this.setState({emailSent:""})}} ><FontAwesome name="times" color={"#ffb346"} size={23}></FontAwesome></TouchableOpacity></View>
                 <View style={{marginTop: 27, marginLeft: 10, marginRight: 10}}>{
    this.state.fontLoaded ? (<View>
        <Text style={{color:"#ffb346", fontSize: 16, fontFamily: 'comic-relief'}}>Un link de resetare a parolei a fost trimis la adresa {this.state.emailSent}. Urmariti linkul si pasii pentru a va reseta parola!</Text>
        <View style={styles.facebookContainer}><TouchableOpacity onPress={()=>{this.closeModal2(); this.setState({emailSent: ""}) }} style={{justifyContent:"center", alignItems:"center", backgroundColor:"#ffb346", width: 160, height: 50, borderWidth: 0, borderRadius: 7}}><Text style={{color:"#fff", fontSize: 14, fontFamily: 'comic-relief'}}>OK</Text></TouchableOpacity></View>
        </View>) : null}</View>
                
                </View>
            </View>
          </Modal>

                <Image style={styles.image} source={{uri: "https://i.imgur.com/Csyw4IL.png"}}/>
                <View style={styles.formular}>
                    <View style={styles.email}>
                    <View style={{paddingRight: 4}}><FontAwesome name="envelope" color={"white"} size={40}></FontAwesome></View>
                    
                    <TextInput onChangeText={(email)=> this.setState({email})} value={this.state.email}
                     placeholder="Email" style={styles.TextInput}></TextInput>
                    </View>

                    <View style={styles.email}>
                    <View style={{marginLeft: 7, marginRight: 10}}><FontAwesome name="lock" color={"white"} size={44}></FontAwesome></View>
                    
                    <TextInput onChangeText={(password)=> this.setState({password})} secureTextEntry={true} value={this.state.password} placeholder="Password" style={styles.TextInput}></TextInput>
                    </View>

                    <View style={{marginTop: 7, alignItems:"center"}}>
                        <TouchableOpacity>
                        <View>{
    this.state.fontLoaded ? (<Text onPress={()=>this.setModalVisible(!this.state.modalVisible)} style={{color:"#fff", fontSize: 13, fontFamily: 'comic-relief'}}>FORGOT PASSWORD?</Text>) : null}</View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, alignItems:"center"}}>
                    <TouchableOpacity style={{backgroundColor:"#fff", width: 160, height: 50, borderWidth: 0, borderRadius: 7}}><View style={styles.facebookContainer}>
                <View>{
    this.state.fontLoaded ? (<Text onPress={() => this.login()} style={{color:"#ffb346", fontSize: 16, fontFamily: 'comic-relief'}}>LOGIN</Text>) : null}</View>
                </View> 
                </TouchableOpacity>
                    </View>
                </View>

                    
                    <View style={{marginTop:35, alignItems:"center"}}>
                    <TouchableOpacity style={{backgroundColor:"#fff", width: 200, height: 50, borderWidth: 0, borderRadius: 7}}><View style={styles.facebookContainer}>
                <View>{
    this.state.fontLoaded ? (<Text onPress={()=>this.props.navigation.navigate('Register')} style={{color:"#ffb346", fontSize: 16, fontFamily: 'comic-relief'}}>REGISTER ACCOUNT</Text>) : null}</View>
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
export default Login;
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
        height: "34%",
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
    TextInputForm:{
        alignSelf:"stretch",
        width: "74%",
        height: 40,
        backgroundColor:"rgba(255, 179, 70,0.25)",
        color: "#ffb346",
    },
    facebookContainer:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        flex:1
    },
    underline: {textDecorationLine: 'underline'},

})