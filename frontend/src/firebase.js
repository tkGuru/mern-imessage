import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDNL0af4myzTZpeRSLq9S6AqSx0iedOksc',
  authDomain: 'imessage-clone-3a8b5.firebaseapp.com',
  databaseURL: 'https://imessage-clone-3a8b5.firebaseio.com',
  projectId: 'imessage-clone-3a8b5',
  storageBucket: 'imessage-clone-3a8b5.appspot.com',
  messagingSenderId: '308979183469',
  appId: '1:308979183469:web:ff7f4fc682999e934c7464',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
