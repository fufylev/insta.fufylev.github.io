import firebase from 'firebase';

// web app's Firebase configuration
export const firebaseConfig = {
    apiKey: 'AIzaSyDkhfEdBwNiXNrd41rkSdH1P46OnT9jgWA',
    authDomain: 'lite-instagram-836d6.firebaseapp.com',
    databaseURL: 'https://lite-instagram-836d6.firebaseio.com',
    projectId: 'lite-instagram-836d6',
    storageBucket: 'lite-instagram-836d6.appspot.com',
    messagingSenderId: '766308466318',
    appId: '1:766308466318:web:339c717aa18ff6d4a993df',
    measurementId: 'G-QPJEH6ZNQH'
};

export const fire = firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
