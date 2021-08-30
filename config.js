import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyApJ7rJvvJmP06VMTi655SOdZ_y6BdOQow",
    authDomain: "booksanta-e5751.firebaseapp.com",
    projectId: "booksanta-e5751",
    storageBucket: "booksanta-e5751.appspot.com",
    messagingSenderId: "566479904324",
    appId: "1:566479904324:web:99ee0baa2ccf452492a611",
    measurementId: "G-WVHDMBDQ4W"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
