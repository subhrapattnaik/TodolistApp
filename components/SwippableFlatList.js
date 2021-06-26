import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { SwipeListView } from 'react-native-swipe-list-view';

import db from '../config';



export default class SwipeableFlatlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      completedTasks : this.props.completedTasks,
    };
  }


  updateMarkAsread =(notification)=>{
    db.collection("add_task").doc(notification.doc_id).update({
      "taskStatus" : "remove"
    })
  }


  onSwipeValueChange = swipeData => {
    var completedTasks = this.state.completedTasks
      const {key,value} = swipeData;

      if(value < -Dimensions.get('window').width){
        const newData = [...completedTasks];
        const prevIndex = completedTasks.findIndex(item => item.key === key);
        this.updateMarkAsread(completedTasks[prevIndex]);
        newData.splice(prevIndex, 1);
        this.setState({completedTasks : newData})
    }
};


  renderItem = data => (
<Animated.View>
        <ListItem
          leftElement={<Icon name="tasks" type="font-awesome" color ='#696969'/>}
          title={data.item.taskName}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={data.item.taskDetail}
          bottomDivider
        />
        </Animated.View>
  );

  renderHiddenItem = () => (
      <View style={styles.rowBack}>
          <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
              <Text style={styles.backTextWhite}>Remove</Text>
          </View>
      </View>
  );

  render(){
    return(
      <View style={styles.container}>
          <SwipeListView
              disableRightSwipe
              data={this.state.completedTasks}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              rightOpenValue={-Dimensions.get('window').width}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onSwipeValueChange={this.onSwipeValueChange}
          />
      </View>
    )
  }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight:'bold',
        fontSize:15
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29b6f6',
        right: 0,
    },
});