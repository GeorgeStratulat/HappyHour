import React from "react";
import {ScrollView, Alert, YellowBox, Text, View, FlatList, ImageBackground, ActivityIndicator,
    Image, TouchableOpacity, TouchableHighlight, ToastAndroid, StyleSheet, AsyncStorage, Dimensions, Platform} from "react-native";
import { Button } from 'react-native-elements';
    import EvilIcons from "react-native-vector-icons/EvilIcons";
    import FontAwesome from "react-native-vector-icons/FontAwesome";
import Main from "./Main";
import NavBar, { NavButton, NavButtonText, NavGroup, NavTitle } from 'react-native-nav';
import Carousel from 'react-native-snap-carousel';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {Header} from "react-native-elements";
import PopupDialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';
import { TapGestureHandler } from "react-native-gesture-handler";


class User extends React.Component{
    constructor(){
        super()
        this.state={
            dataSource:[],
            nrBauturi: 0,
            tipAbonament:"",
            sfarsitAbonament:"",
            userInfo: ""
        }
    }

    componentDidMount(){
        const {navigation} = this.props;
        const {goBack} = this.props.navigation;
        var idUser = navigation.getParam("user_id", "NO-ID");
        var userInfo = navigation.getParam("user_info", "NO-INFO");
        console.log("poate poate poate->>>>" + JSON.stringify(AsyncStorage.getItem("user_id")));
        this.setState({userInfo: userInfo});
        console.log("de aici ar trebui->>" + JSON.stringify(navigation.getParam("user_id", "NO-ID")));
        const url = "https://radiant-beyond-44987.herokuapp.com/users/"+idUser ;
        console.log(url);
        fetch(url)
        .then((response)=>response.json())
        .then( result => {

           
            this.setState({dataSource: result, nrBauturi: result.lista_bauturi.length})

        }).catch((error) => {
            console.log(error);
        });   

        const url2 = "https://radiant-beyond-44987.herokuapp.com/abonament_user/user/"+idUser;
        console.log(url2);
        fetch(url2).then((response)=>response.json())
        .then(result =>{
            console.log(result[0].tip_abonament);
            this.setState({sfarsitAbonament: result[0].data_sfarsit});
            const url3= "https://radiant-beyond-44987.herokuapp.com/abonamente/"+result[0].tip_abonament;
            console.log(url3);
            fetch(url3).then((response)=>response.json())
            .then(result => {
                console.log(result.nume_abonament);
                this.setState({tipAbonament: result.nume_abonament})
            })
        }).catch((error) => {
            console.log(error);
        });   

        
    }
    _logout(){
        AsyncStorage.setItem('email', '');
        this.props.navigation.navigate(('Login'));

    }

    renderItem = ({item}) =>{
        console.log(item.lista_bauturi);
        // if(this.state.tipAbonament){'
        if(1==0){
        return(
     <View style={styles.container} >

                <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                     backgroundColor:"#ffb346", height:70}}>
                    {/* <View style={{ marginLeft: 15, }}><View><Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}>{item.prenume} {item.nume}</Text></View><View><Text style={{color: "#fff",fontSize:13}}>{item.email}</Text></View></View> */}
                    <View style={{ marginLeft: 15, }}><View><Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}> {this.state.userInfo.name}</Text></View><View><Text style={{color: "#fff",fontSize:13}}>{item.email}</Text></View></View>

                        {/* <View style={{marginRight: 15,}}><Image source={{uri: this.state.userInfo.picture.data.url}} style={{ width: 45, height: 45}}></Image></View> */}
                        <View style={{marginRight: 15,}}><Image source={require("../../assets/happy_user2.png")} style={{ width: 45, height: 45}}></Image></View>

                    </View>
                
                    <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                     backgroundColor:"#ffb346", height:70}}>
                    <View style={{ marginLeft: 15 }}>
                    <View>
                        <Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}>Ati beneficiat de:</Text>
                        </View>
                        <View>
                            <Text style={{color: "#fff",fontSize:13, paddingBottom: 15}}>{this.state.nrBauturi} bauturi</Text>
                            </View>
                            </View>
                    <View style={{marginRight: 15}}><TouchableOpacity onPress={()=> { this.props.navigation.navigate(('Istoric'), {user_id: item._id}) } }
                style={{width: 100, height: 38, marginTop: 10, flexDirection:"row", alignItems:"center", 
                backgroundColor:"#fbd22c", justifyContent: 'center',marginTop: 7, marginBottom: 15}}>
                <Text style={{fontSize: 15, color:"white"}}>Vezi istoric</Text>
                </TouchableOpacity></View>
                     </View>

                

                <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                    backgroundColor: "#ffb346", height: 70, paddingBottom: 15}}>
                    <View style={{ marginLeft: 15, }}><View><Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}>Detalii abonament:</Text></View><View><Text style={{color: "#fff",fontSize:13}}>Tip abonament: {this.state.tipAbonament}</Text></View>
                        <View><Text style={{color: "#fff",fontSize:13}}>Data sfarsit: {this.state.sfarsitAbonament}</Text></View></View>

                        
                    </View>

                <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                    backgroundColor: "#ffb346", height: 70, paddingBottom: 15}} > 
                <Text>Test</Text>
                </View>

                <Button
                    title='Logout'
                    loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                    titleStyle={{ fontWeight: "900" }}
                    buttonStyle={{
                        marginTop: 20,
                        backgroundColor: "#e24650",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        alignSelf: 'center'
                    }}
                    onPress={() => this._logout()}
                    containerStyle={{ paddingTop: 20 }}
                />

                 </View>
        );
    }else{
        return(
            <View style={styles.container}>
       
                       <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                            backgroundColor:"rgba(255,179,70, 0.7)", height:70, marginBottom: 10}}>
                               <View style={{ marginLeft: 15,}}><View><Text style={{color:"white", fontSize:20, fontWeight:"bold"}}>{item.prenume} {item.nume}</Text></View><View><Text style={{color: "#fff",fontSize:13}}>{item.email}</Text></View></View>
       
                               <View style={{marginRight: 15,}}><Image source={require("../../assets/happy_user2.png")} style={{ width: 45, height: 45}}></Image></View>
                           </View>
                       
                           <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                            backgroundColor:"rgba(255,179,70, 0.7)", height:70, marginTop: 2, marginBottom: 10}}>
                    <View style={{ marginLeft: 15 }}><View><Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}>Ati beneficiat de:</Text></View><View><Text style={{color: "#fff",fontSize:13}}>{this.state.nrBauturi} bauturi</Text></View></View>
                           <View style={{marginRight: 15}}><TouchableOpacity onPress={()=> { this.props.navigation.navigate(('Istoric'), {user_id: item._id}) } }
                       style={{width: 100, height: 38, marginTop: 10, flexDirection:"row", alignItems:"center", 
                       backgroundColor:"#fbd22c", justifyContent: 'center',marginTop: 7, marginBottom: 15}}>
                       <Text style={{fontSize: 15, color:"white"}}>Vezi istoric</Text>
                       </TouchableOpacity></View>
                            </View>
       
                       
       
                       <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                            backgroundColor:"rgba(255,179,70, 0.7)", height:70, paddingBottom: 15, marginTop: 2, marginBottom: 10}}>
                    <View style={{ marginLeft: 15, }}><View><Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}>Detalii abonament:</Text></View><View><Text style={{color: "#fff",fontSize:13}}>Nu aveti abonament</Text></View></View>
                               
                               <View style={{marginRight: 15}}>
                               <TouchableOpacity onPress={()=> { this.props.navigation.navigate(('Cumpara_Abonament'), {user_id: item._id}) } }
                       style={{width: 100, height: 38, marginTop: 10, flexDirection:"row", alignItems:"center", 
                       backgroundColor:"#fbd22c", justifyContent: 'center',marginTop: 7, marginBottom: 15}}>
                       <Text style={{fontSize: 15, color:"white"}}>Cumpara abonament</Text>
                       </TouchableOpacity>
                       </View>
                               
       
                       
                           </View>

                <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center', 
                                backgroundColor: "rgba(255,179,70, 0.7)", height: 70, paddingBottom: 15, marginTop: 2, marginBottom: 2}}> 
                    <TouchableOpacity onPress={()=> { this.props.navigation.navigate(('Support'), {user_id: item._id}) } } style={{ marginLeft: 15, }}><Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}>Support</Text></TouchableOpacity>
                </View>

                           <Button
                    title='Logout'
                    loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                    titleStyle={{ fontWeight: "900" }}
                    buttonStyle={{
                        marginTop: 20,
                        backgroundColor: "#e24650",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        alignSelf: 'center'
                    }}
                    onPress={() => this._logout()}
                    containerStyle={{ paddingTop: 20 }}
                />
                        </View>
               );
    }
    }

    render(){
        var dataUser = [];
        console.log("ASTA DE CE DUMNEZEU MERGE?? "+this.state.dataSource);
        dataUser.push(this.state.dataSource);
        console.log(this.state.dataSource);
        console.log(this.state.nrBauturi);
        console.log(this.state.tipAbonament);
        console.log(this.state.sfarsitAbonament);
        return(
            <View style={styles.container}>
                <Header
                   
                    centerComponent={<LogoTitle />}
                    rightComponent={{ icon: 'md-arrow-round-forward', type: "ionicon", color: '#ffcd00', size: 24, top: 0, onPress: () => this.props.navigation.navigate(('Oferte')) }}
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

                <FlatList
                    data={dataUser}
                    renderItem={this.renderItem}
                    keyExtractor={item => item._id} 
                    
                    >
            </FlatList>
            </View>
        )
    }
}
export default User;
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