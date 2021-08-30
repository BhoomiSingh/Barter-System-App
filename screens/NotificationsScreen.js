import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class NotificationsScreen extends React.Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      allNotifications : []
    }
  this.notificationRef= null
  }

  getNotifications=()=>{
    this.notificationRef=db.collection('all_notifications').where('notification_status', '==','Unread')
    .where('targeted_user_id','==',this.state.userId).onSnapshot((snapshot)=>{
      var allNotifications= []
      snapshot.docs.map((doc)=>{
        var notification= doc.data()
        notification['doc_id']=doc.id
        allNotifications.push(notification)
      })
      this.setState({
        allNotifications: allNotifications
      })
    })
  }
  componentDidMount(){
    this.getNotifications()
  }
  keyExtractor=(item, index)=>{
    index.toString()
  }

 renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.message}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    )
  }
  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title={'Notifications'} navigation={this.props.navigation}/>
        <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length===0?
            (
              <View style={{flex:1, justifyContent:'Center', alignItems:'Center'}}>
                <Text>
                  Do you have no notifications
                </Text>
              </View>
            ):
            (
              <FlatList 
              keyExtractor={this.keyExtractor}
              data={this.state.allNotifications}
              renderItem={this.renderItem} />
            )
          }
        </View>
      </View>
    )
  }
}