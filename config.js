import firebase from 'firebase'
require("@firebase/firestore");
 /*var firebaseConfig = {
    apiKey: "AIzaSyBUSady0I8yRrzY-C2nqOhRTzirPTFKgPg",
    authDomain: "todolist-dde1c.firebaseapp.com",
    projectId: "todolist-dde1c",
    storageBucket: "todolist-dde1c.appspot.com",
    messagingSenderId: "1022059496458",
    appId: "1:1022059496458:web:bbabe7d3db3eb8bcef0bf3"
  };*/

var firebaseConfig = {
    apiKey: "AIzaSyDfw2cf6IHJRIkBA2sfXAYMwHaO_qyzzJM",
    authDomain: "todolist-ac262.firebaseapp.com",
    projectId: "todolist-ac262",
    storageBucket: "todolist-ac262.appspot.com",
    messagingSenderId: "693188536027",
    appId: "1:693188536027:web:224768e3746108861ccefe"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  export default firebase.firestore();
  //export default firebaseConfig