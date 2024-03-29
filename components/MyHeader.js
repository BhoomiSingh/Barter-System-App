import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class MyHeader extends React.Component{
  constructor(){
    super()
    this.state={
      userId: firebase.auth().currentUser.email,
      value: ''
    }
  }
  getNumberOfUnReadNOtifications(){
    db.collection('all_notifications').where('notification_status','==','Unread').where('targeted_user_id','==', this.state.userId).onSnapshot((snapshot)=>{
      var unreadNotifications=snapshot.docs.map((doc)=>{
        doc.data()
      })
      this.setState({
        value: unreadNotifications.length
      })
    })
  }
  componentDidMount(){
    this.getNumberOfUnReadNOtifications()
  }
  bellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#696969' size={25} onPress={()=>{
          this.props.navigation.navigate('Notifications')
        }}/>
        <Badge value={this.state.value} containerStyle={{position:'absolute', top:-4, right:-4}}/> 
      </View>
    )
  }
  render(){
  return (
    <Header
      leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
      centerComponent={{ text: this.props.title, style: { color: '#696969', fontSize:20,fontWeight:"bold", } }}
      rightComponent={<this.bellIconWithBadge{...this.props} />} 
      backgroundColor = "#9FD8DF"
    />
  )
}
}


