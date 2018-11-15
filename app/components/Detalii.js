import React from "react";
import {ScrollView, YellowBox, Text, View, FlatList, ImageBackground, ActivityIndicator,
    Image, TouchableOpacity, ToastAndroid, StyleSheet, AsyncStorage} from "react-native";
import Main from "./Main";
import NavBar, { NavButton, NavButtonText, NavGroup, NavTitle } from 'react-native-nav';


class Detalii extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            itemSource: [],
            isLoading: true
            
        };
        
    }


    renderItem = ({item}) =>{
        return(
        <TouchableOpacity style={{flex:1, flexDirection:"row", marginBottom: 3}} >
            <Image style={{width:80, height:80, margin:5}} 
                source={{uri: item.imagine}} />
                 <View style={{flex:1, justifyContent:"center", marginLeft: 5}}>
                     <Text style={{fontSize: 18, color: "green", marginBottom: 15}}>
                         {item.nume}
                     </Text>
                     <Text style={{fontSize:16, color:"red"}}> 

                         {item.detalii}
                     </Text>
                 </View>
        
        </TouchableOpacity>

        
        );
    }

    

     componentDidMount(){
            //  this._loadInitialState().done();
            // this.setState({sourceId: value});
            const { navigation } = this.props;
            const itemId = navigation.getParam("idDetalii", "NO-ID");
            console.log(itemId);
            const stringId = itemId.toString();
            const url = "http://192.168.100.5:4000/venue/";
            // var stringId = value.toString();
            // console.log(stringId);
            var fullUrl = url.concat(stringId);
            console.log(fullUrl);
            fetch(fullUrl)
            .then((response)=>response.json())
            .then( result => this.setState(
                {itemSource: result, isLoading: false }, console.log(result)))
            .catch((error) => {
                console.log(error);
            });   
            // console.log(this.state.itemSource);  
            }

            

            
    

        render(){
            const { itemSource } = this.state;

           
            return(
            <View style={styles.container}>
            <NavBar>
        <NavTitle>
          {"App"}
        </NavTitle>
        <NavGroup>
          <NavButton onPress={() => alert('hi')}>
            <NavButtonText>
              {"Pula"}
            </NavButtonText>
          </NavButton>
          <NavButton onPress={() => alert('hi')}>
            <NavButtonText>
              {"Pula"}
            </NavButtonText>
          </NavButton>
          <NavButton>
            <NavButtonText>
              {"Button"} </NavButtonText></NavButton></NavGroup></NavBar>


      <FlatList
                    data={this.state.itemSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
             />

      </View>

        )}
        
}
export default Detalii;

const styles = StyleSheet.create({
    header:{
        fontSize: 38,
        padding: 7
    },
    container: {
        padding:20,
      flex:1,
      backgroundColor: "#f5fcff",
      
    }
});