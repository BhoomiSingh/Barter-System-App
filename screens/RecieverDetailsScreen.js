import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {Header, Icon} from 'react-native-elements';

export default class RecieverDetails extends React.Component{
  constructor(props){
    super(props)
    this.state={
      userId:firebase.auth().currentUser.email,
      recieverId:this.props.navigation.getParam('details')['user_id'],
      requestId:this.props.navigation.getParam('details')['request_id'],
      bookName:this.props.navigation.getParam('details')['book_name'],
      reasonsToRequest:this.props.navigation.getParam('details')['reason_to_request'],
      recieverName:'',
      recieverContact:'',
      recieverAddress:'',
      recieverRequestDocId:''
    }
  }
  getReciverDetails(){
    db.collection('users').where('email_id','==',this.state.recieverId).get()
    .then((snapshot)=>{
      snapshot.forEach((document)=>{
        this.setState({
          recieverName: document.data().first_name,
          recieverContact: document.data().contact,
          recieverAddress: document.data().address
        })
      })
    })
    db.collection('requested_books').where('request_id','==',this.state.requestId).get()
    .then((snapshot)=>{
      snapshot.forEach((document)=>{
        this.setState({
          recieverRequestDocId: document.id
        })
      })
    })
  }
  getUserDetails=(userId)=>{
    db.collection('users').where('email_id','==',userId).get()
    .then((snapshot)=>{
      snapshot.forEach((document)=>{
        this.setState({
          userName: document.data().first_name+' '+document.data().last_name
        })
      })
    })
  }
  updateUserDetails=()=>{
    db.collection('all_donations').add({
      book_name: this.state.bookName,
      request_id:this.state.requestId,
      requested_by: this.state.recieverName,
      donor_id:this.state.userId,
      request_status:'Donor Intrested'
    })
  }
  updateBookStatus=()=>{
    db.collection('all_donations').add({
      book_name: this.state.bookName,
      request_id:this.state.requestId,
      requested_by:this.state.recieverName,
      donor_id:this.state.userId,
      request_status:'Donor Intrested'
    })
  }
  addNotification=()=>{
    var message=this.state.userName+' Has shown intrest in donating the book'
    db.collection('all_notifications').add({
      targeted_user_id: this.state.recieverId,
      donor_id:this.state.userId,
      request_id:this.state.requestId,
      book_name:this.state.bookName,
      date:firebase.firestore.FieldValue.serverTimestamp(),
      notification_status:'Unread',
      message:message
    })
  }
  componentDidMount(){
    this.getReciverDetails()
    this.getUserDetails(this.state.userId)

  }
  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
        <Header leftComponent={<Icon name='arrow-left' type='feather' color='grey' onPress={()=>{
        this.props.navigation.goBack()
        }}/>}
        centerComponent={{text:'Donate Books', style:{color:'#90a5a9', fontSize:20, fontWeight:'bold'}}}/>
        </View>
        <View style={{flex:0.3}}>
          <Text style={{fontSize:20}}>Book Information</Text>
          <Text>Name:{this.state.bookName}</Text>
          <Text>Reason for requesting:{this.state.reasonsToRequest}</Text>
        </View>
        <View style={{flex:0.3}}>
          <Text style={{fontSize:20}}>Reciever Information</Text>
          <Text>Name:{this.state.recieverName}</Text>
          <Text>Contact:{this.state.recieverContact}</Text>
          <Text>Address:{this.state.recieverAddress}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId!==this.state.userId?
            (
              <TouchableOpacity style={styles.button} onPress={()=>{
                this.updateBookStatus();
                this.addNotification();
                this.props.navigation.navigate('MyDonations')
              }}>
                <Text>I want to donate</Text>
              </TouchableOpacity>
            ):null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})