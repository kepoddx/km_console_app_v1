"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase/app");
// tslint:disable-next-line:no-import-side-effect
require("firebase/storage");
// tslint:disable-next-line:no-import-side-effect
require("firebase/firestore");
var landingPagesConfig = {
    apiKey: "AIzaSyApH7LmYz8f60j8-Db4fl6inv8aAKzK7dg",
    authDomain: "landingpages-f8e97.firebaseapp.com",
    databaseURL: "https://landingpages-f8e97.firebaseio.com",
    projectId: "landingpages-f8e97",
    storageBucket: "landingpages-f8e97.appspot.com",
    messagingSenderId: "500959981299"
};
var mainAccountConfig = {
    apiKey: "AIzaSyCgcqwGUG4p43wXQDCfjML05tABeGChFOQ",
    authDomain: "gannett-db.firebaseapp.com",
    databaseURL: "https://gannett-db.firebaseio.com",
    projectId: "gannett-db",
    storageBucket: "gannett-db.appspot.com",
    messagingSenderId: "1098295996369"
};
var fireBaseMain = firebase.initializeApp(mainAccountConfig, 'main');
var fireBaseTest = firebase.initializeApp(landingPagesConfig, "testing");
exports.FirebaseMainStorage = fireBaseMain.storage();
exports.FirebaseTestDB = fireBaseTest.firestore();
exports.FireBaseMainDB = fireBaseMain.firestore();
//# sourceMappingURL=firebase.config.js.map