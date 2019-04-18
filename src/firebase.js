import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyDrq80wgevSeiF8b3MGkpuE-ZsvnifSh0g",
    authDomain: "twittertweets-a2283.firebaseapp.com",
    databaseURL: "https://twittertweets-a2283.firebaseio.com",
    projectId: "twittertweets-a2283",
    storageBucket: "twittertweets-a2283.appspot.com",
    messagingSenderId: "293559937988"
  };
firebase.initializeApp(config);

export default firebase;
