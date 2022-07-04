import firebase from 'firebase';
var mode = "test";
var firebaseConfig = {};

 firebaseConfig = {
    apiKey: "AIzaSyBTNYxuQCS6LA11Jbc9bjfq8GW1-PuL-po",
    authDomain: "suskanmaster.firebaseapp.com",
    databaseURL: "https://suskanmaster-e8221.firebaseio.com/",
    projectId: "suskanmaster",
    storageBucket: "suskanmaster.appspot.com",
    messagingSenderId: "356742756849",
    appId: "1:356742756849:web:211f0c9fd657a9c77a6c50"
  };


  const firebaseApp =  firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const realtimedb = firebaseApp.database();
  


  export { auth , firebaseApp, realtimedb };
  export default db;