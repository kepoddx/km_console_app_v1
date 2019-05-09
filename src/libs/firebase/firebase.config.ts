import * as firebase from 'firebase/app';
// tslint:disable-next-line:no-import-side-effect
import 'firebase/storage';
// tslint:disable-next-line:no-import-side-effect
import 'firebase/firestore';

  const landingPagesConfig = {
    apiKey: "AIzaSyApH7LmYz8f60j8-Db4fl6inv8aAKzK7dg",
    authDomain: "landingpages-f8e97.firebaseapp.com",
    databaseURL: "https://landingpages-f8e97.firebaseio.com",
    projectId: "landingpages-f8e97",
    storageBucket: "landingpages-f8e97.appspot.com",
    messagingSenderId: "500959981299"
  };

  const mainAccountConfig  = {
    apiKey: "AIzaSyCgcqwGUG4p43wXQDCfjML05tABeGChFOQ",
    authDomain: "gannett-db.firebaseapp.com",
    databaseURL: "https://gannett-db.firebaseio.com",
    projectId: "gannett-db",
    storageBucket: "gannett-db.appspot.com",
    messagingSenderId: "1098295996369"
  };

 const fireBaseMain = firebase.initializeApp(mainAccountConfig, 'main');
 const fireBaseTest =  firebase.initializeApp(landingPagesConfig, "testing");

  export const FirebaseMainStorage = fireBaseMain.storage();
  export const FirebaseTestDB = fireBaseTest.firestore();
  export const FireBaseMainDB = fireBaseMain.firestore();