import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyB2pGs-38rUtkc_vpNPX6L-boEvQD5PeQA",
    authDomain: "playit-db.firebaseapp.com",
    projectId: "playit-db",
    storageBucket: "playit-db.appspot.com",
    messagingSenderId: "206990199575",
    appId: "1:206990199575:web:cf39226201b7fc1979c552",
    measurementId: "G-XKYRKG34YV"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;