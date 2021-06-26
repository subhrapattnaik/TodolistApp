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

import firebase from 'firebase';
import db from '../config.js';

export default class TaskToDo extends Component {
  constructor() {
    super();
    this.state = {
      allTasks: [],
      taskName: '',
    };
    this.requestRef = null;
  }

  static navigationOptions = { header: null };

  getAllTasks = () => {
    this.requestRef = db
      .collection('add_task')
      .where('taskStatus', '==', 'NotDone')
      .onSnapshot((snapshot) => {
        var allTasks = [];
        snapshot.docs.map((doc) => {
          var task = doc.data();
          console.log(task);

          task['doc_id'] = doc.id;

          allTasks.push(task);
        });
        this.setState({
          allTasks: allTasks,
        });
      });
  };
  markitdone = (task) => {
    console.log('fffff');

    db.collection('add_task').doc(task.doc_id).update({
      taskStatus: 'Done',
    });
    alert('Task is completed');
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
      rightElement={
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: item.taskStatus === 'Done' ? 'green' : '#ff5722',
            },
          ]}
          onPress={() => {
            this.markitdone(item);
          }}>
          <Text style={{ color: '#ffff' }}>
            {item.taskStatus === 'Done' ? 'Done' : 'Done'}
          </Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  componentDidMount() {
    this.getAllTasks();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground source={require('../assets/bg.jpeg')} style={styles.backgroundImage}> 
          {this.state.allTasks.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>There are No Tasks To Do</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allTasks}
              renderItem={this.renderItem}
            />
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
