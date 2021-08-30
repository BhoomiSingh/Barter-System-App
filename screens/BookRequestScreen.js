import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import {BookSearch} from 'react-native-google-books';

export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      bookName:"",
      reasonToRequest:"",
      dataSource:"",
      showFlatList:false
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest = async(bookName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    var books= await BookSearch.searchbook(bookName, 'AIzaSyApJ7rJvvJmP06VMTi655SOdZ_y6BdOQow')
    db.collection('requested_books').add({
        "user_id": userId,
        "book_name":bookName,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
        "date" : firebase.firestore.FieldValue.serverTimestamp(),
        "image_link" : books.data[0].volumeInfo.imageLinks.smallThumbnail
    })

    this.setState({
        bookName :'',
        reasonToRequest : ''
    })

    return Alert.alert("Book Requested Successfully")
  }

 async getBooksFromApi(bookName){
   this.setState({
     bookName:bookName
   })
   if(bookName.length>2){
     var books = await BookSearch.searchbook(bookName,'AIzaSyApJ7rJvvJmP06VMTi655SOdZ_y6BdOQow')
     this.setState({
       dataSource: books.data,
       showFlatList: true
       
     })
   }
 }

 renderItem=({item, i})=>{
   return(
     <TouchableHighlight style={{alignItems: "center", backgroundColor: 'grey',padding:10, width:'90%'}}
                         activeOpacity={0.5}
                         underlayColor={'grey'}
                         onPress={()=>{
                           this.setState({
                             showFlatList:false,
                             bookName: item.volumeInfo.title
                           })
                         }}
                         bottomDivider>
      <Text>{item.volumeInfo.title}</Text>
     </TouchableHighlight>
   )
 }

  render(){
    return(
        <View style={{flex:1}}>
          <MyHeader title="Request Book" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter book name"}
                onChangeText={(text)=>{
                   this.getBooksFromApi(text)
                }}
                onClear={(text)=>{
                  this.getBooksFromApi('')
                }}
                value={this.state.bookName}
              />
              {
                this.state.showFlatList===true?
                (
                  <FlatList data={this.state.dataSource} keyExtractor={(item, index)=>{
                    index.toString()
                  }} renderItem={this.renderItem} style={{marginTop:10}} enableEmptySections={true}/>
                ):
                (
                  <View style={{alignItems:"center"}}>
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the book"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
              </View>
                )
              }
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
