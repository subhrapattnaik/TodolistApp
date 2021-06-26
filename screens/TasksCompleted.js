import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,ImageBackground
} from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import SwipeableFlatlist from '../components/SwippableFlatList';
import firebase from 'firebase';
import db from '../config.js';

export default class TasksCompleted extends Component {
  constructor() {
    super();
    this.state = {
      completedTasks: [],
      taskName: '',
    };
    this.requestRef = null;
  }

  static navigationOptions = { header: null };

  getCompletedTasks = () => {
    this.requestRef = db
      .collection('add_task')
      .where('taskStatus', '==', 'Done')
      .onSnapshot((snapshot) => {
        var completedTasks = [];
        snapshot.docs.map((doc) => {
          var task = doc.data();
          console.log(task);

          task['doc_id'] = doc.id;

          completedTasks.push(task);
        });
        this.setState({
          completedTasks: completedTasks,
        });
      });
  };
  

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.taskName}
      subtitle={
        'Task Details: ' + item.taskDetail + '\nStatus : ' + item.taskStatus
      }
      leftElement={<Icon name="tasks" type="font-awesome" color="#696969" />}
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      
      bottomDivider
    />
  );

  componentDidMount() {
    this.getCompletedTasks();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground source={require('../assets/bg.jpeg')} style={styles.backgroundImage}> 
          {this.state.completedTasks.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>List of all Completed Tasks </Text>
            </View>
          ) : (
          
          <SwipeableFlatlist completedTasks={this.state.completedTasks}/>
          )}
           </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
     backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});
