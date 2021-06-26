import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppwelcomePage from './screens/AppwelcomePage'
import AddTaskScreen from './screens/AddTaskScreen'
import TasksToDo from './screens/TaskToDo'
import CompletedTaskList from './screens/TasksCompleted'

const Stack = createStackNavigator();


export default class App extends React.Component{
  render(){
    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screensOptions={{
        headerShown:false
      }}>
     <Stack.Screen name="Home" component={AppwelcomePage} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="TaskList" component={TasksToDo} />
        <Stack.Screen name="CompletedTaskList" component={CompletedTaskList} />
      </Stack.Navigator>
      </NavigationContainer>
    
    )
  }
}

      
      
      
  
    
