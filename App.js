
import React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {launchCamera,launchImageLibrary} from 'react-native-image-picker';

const options = {
  title:"my pic ",
  takePhotoButtonTitle:"Take photo",
  chooseFromLibraryButtonTitle:"Choose Photo",
  includeBase64:true,
  fileSize:true
}

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      launchCameraValue:null,
      launchImageLibraryValue:null
    }
  }

  LaunchCameraFunction = () =>{
  launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error)
      {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton)
      {
        console.log('User tapped custom button: ', response.customButton);
      }
      else if ((response.fileSize/1000000)>4)
      {
        alert('Image size should be less than 4 MB');
      }
      else {     
        const camerasource = {uri: response.uri}
        this.setState({
          launchCameraValue: camerasource
        })
  }
})
}
LaunchImageLibraryFunction = () =>{
  launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error)
      {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton)
      {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
  
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log("Source  : ",source);

        const librarysource = { uri: response.uri };
        this.setState({
          launchImageLibraryValue: librarysource,
        });
  }
})
}
  render(){
  return (
    <View style={{flex:1}}>
      <View style={styles.launchCameraStyle}>
        <TouchableOpacity style={{width:150}}>
          <Button color="black" style={{backgroundColor:'red'}}
            title="Launch Camera"
            onPress={this.LaunchCameraFunction}
          />
        </TouchableOpacity>
      </View>
       <View style={styles.launchImageLibraryStyle}>
        <TouchableOpacity style={{width:150}}>
          <Button color="black" style={{backgroundColor:'red'}}
            title="Import from Device"
            onPress={this.LaunchImageLibraryFunction}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex:1,backgroundColor:'white',padding:20}}>
    {
      ((this.state.launchCameraValue)!=null)?
      <Image source = {this.state.launchCameraValue} style={{width:"100%",height:"100%"}}/>:
      <Image source = {this.state.launchImageLibraryValue} style={{width:"100%",height:"100%"}}/>
    }
      </View>
      </View>
  )
  }};


const styles = StyleSheet.create({
  launchCameraStyle:{
    flex:0.5,
    paddingBottom:10,
    backgroundColor:'lightblue',
    justifyContent:'center',
    alignItems:'center'
  },
  launchImageLibraryStyle:{
    flex:0.5,
    paddingBottom:10,
    backgroundColor:'salmon',
    justifyContent:'center',
    alignItems:'center'
  }
})