import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Header} from 'react-native-elements';
import firebase from 'firebase'
import db from '../config'

 
export default class AddTaskScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            task_Name: '',
          task_Detail: '',
   
        }
    }

    submitTask=()=>{
        db.collection("add_task").add({
         'Time': firebase.firestore.Timestamp.now().toDate(),
            'taskName': this.state.task_Name,
           'taskDetail': this.state.task_Detail,
           'taskStatus':"NotDone",
           
        })
alert("Task Added Successfully")
        this.setState({
            task_Name: '',
            task_Detail: '',
           
        })
    }

    render(){
        return(
            <View style={styles.container}>
               <ImageBackground source={require('../assets/bg.jpeg')} style={styles.backgroundImage}> 
                <TextInput
                    placeholder="Task Name"
                    placeholderTextColor='black'
                    onChangeText= {(text)=>{
                        this.setState({
                            task_Name: text
                        })
                    }}
                    value={this.state.task_Name}
                    style={styles.task_Name} />
                <TextInput 
                    placeholder="Task Details"
                    placeholderTextColor='black'
                    onChangeText= {(text)=>{
                        this.setState({
                            task_Detail: text
                        })
                    }}
                    value={this.state.storyText}
                    style={styles.task_detail}
                    multiline={true}/>
                
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.submitTask}
                   >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                   </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 
  task_Name: {
      height: 40,
      borderWidth: 2,
      margin: 10,
       padding: 6,
  },
  task_detail: {
      height: 250,
      borderWidth: 2,
      margin: 10, 
      padding: 6,
  },
  submitButton:{
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: 'pink',
      width: 80,
      height: 40,color:'black',
  },
  buttonText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      color:'black',
  },
     backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});