import firebase from 'firebase';
import 'firebase/app';
import { isArray } from 'redux-actions/lib/utils/isArray';

require('firebase/firestore');

// Initialize Cloud Firestore through Firebase
export const firebaseConfig = {
    apiKey: 'AIzaSyAkR8iasRbs1BGSnrzzyCgoR791pDqrJ0Y',
    authDomain: 'lite-instagram-v2.firebaseapp.com',
    databaseURL: 'https://lite-instagram-v2.firebaseio.com',
    projectId: 'lite-instagram-v2',
    storageBucket: 'lite-instagram-v2.appspot.com',
    messagingSenderId: '259872157190',
    appId: '1:259872157190:web:7dc00c09524ab547eedd87',
    measurementId: 'G-Q5XJL006RY',
};

export const fire = firebase.initializeApp(firebaseConfig);
export const db = fire.firestore();

export const getCollection = (collection) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).get().then((querySnapshot) => {
            let metadata = {};
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const id = doc.id;
                metadata = { ...metadata, [id]: doc.data() };
            });
            resolve(metadata);
        }).catch(error => console.log(error));
    });
};

export function loadFirstSetOfPictures() {
    return new Promise((resolve, reject) => {
        // get first items from the DB 
        let first = db.collection('pictures')
            .orderBy('id')
            .limit(24);

        // fill the pictures with the entries
        let pictures = {}; // empty object
        first.get().then((snapshot) => {
            snapshot.forEach((document) => {
                const id = document.id;
                pictures = { ...pictures, [id]: document.data() };
            });
        }).catch(error => reject(error));

        // Get the last visible document
        first.get().then((documentSnapshots) => {
            let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
            // return the results
            resolve({ lastVisible, pictures });
        }).catch(error => reject(error));
    });
}

export function loadNextSetOfPictures(lastVisible) {
    return new Promise((resolve, reject) => {
        // get next items from the DB 
        let query = db.collection('pictures')
            .orderBy('id')
            .startAfter(lastVisible)
            .limit(24);

        // fill the pictures with the entries
        let pictures = {}; // empty object
        query.get().then((snapshot) => {
            snapshot.forEach((document) => {
                const id = document.id;
                pictures = { ...pictures, [id]: document.data() };
            });
        }).catch(error => console.log(error));

        // Get the last visible document
        query.get().then((documentSnapshots) => {
            // Get the last visible document
            let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
            // return the results
            resolve({ lastVisible, pictures });
        }).catch(error => console.log(error));
    });

}

export function getQuery() {
    const pictures = db.collection('pictures').doc('likes');
    pictures.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
        });
    });
}

export function getPicture(id) {
    return new Promise((resolve, reject) => {
        const picture = db.collection('pictures').doc(id);
        picture.get().then((doc) => {
            if (doc.exists) {
                resolve(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

/*export const writeUserData = (uid, name, email, imageUrl) => {
    console.log(uid, name, email, imageUrl);
    database.ref('users/' + uid).set({
        username: name,
        avatar: imageUrl,
        bio: '',
        email: email,
    });
};

export const updateUser = () => {
    const user = fire.auth().currentUser;
    user.updateProfile({
        displayName: 'Test User',
        photoURL: 'https://example.com/jane-q-user/profile.jpg',
    }).then(() => {
        // Update successful.
        console.log('Update successful');
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
};*/

// this.updateUser();
// user in DB
/*if (fire.auth().currentUser !== null) {
    const {uid, email, displayName, photoURL} = fire.auth().currentUser;
    const user = fire.auth().currentUser;
    console.log(user);
    this.writeUserData(uid, displayName, email, photoURL)
}*/

/*
Object.keys(faked.pictures).forEach(key => {
    db.collection('pictures').doc(key).set({
        ...faked.pictures[key]
    })
        .then((docRef) => {
            console.log('Document written with ID: ', docRef);
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });
});*/
