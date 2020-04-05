import firebase from 'firebase';
import 'firebase/app';

require('firebase/firestore');

export const firebaseConfig = {
    apiKey: 'AIzaSyDV_nIYcvEbvHUAwDCgiya3TPVCr43Fzg4',
    authDomain: 'insta-andrey-f.firebaseapp.com',
    databaseURL: 'https://insta-andrey-f.firebaseio.com',
    projectId: 'insta-andrey-f',
    storageBucket: 'insta-andrey-f.appspot.com',
    messagingSenderId: '510498654768',
    appId: '1:510498654768:web:9c5b79ee428525a5bd7bf5',
    measurementId: 'G-ZHTYBPCLQ7',
};

export const fire = firebase.initializeApp(firebaseConfig); // used
export const db = fire.firestore(); // used

export function generateID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const addCollections = (user) => {
    db.collection('users').doc(user.uid).set({
        ...user
    })
        .then(() => {
            console.log('Document successfully written!');
        })
        .catch((error) => {
            console.error('Error writing document: ', error);
        });
};

/**
 *
 * @param uid
 * @returns {Promise<unknown>}
 */
export const checkIfUserMetadataExists = (uid) => {
    return new Promise((resolve, reject) => {
        const user = db.collection('users').doc(uid);
        user.get().then((doc) => {
            if (doc.exists) {
                resolve({ ifExists: true, metadata: doc.data() });
            } else {
                resolve({ ifExists: false });
            }
        }).catch((error) => {
            console.log('Error getting document:', error);
        });
    });

};

// used
export const setUser = () => {
    return new Promise((resolve, reject) => {
        if (fire.auth().currentUser !== null) {
            const { uid, email, displayName, photoURL } = fire.auth().currentUser;
            const user = fire.auth().currentUser;
            console.log(user);
            db.collection('users').doc(uid).set({
                uid,
                name: {
                    'title': '',
                    'first': displayName,
                    'last': '',
                },
                avatar: {
                    'large': photoURL,
                    'medium': photoURL,
                    'thumbnail': photoURL,
                },
                email,
                dob: null,
                username: null,
                gender: null,
                phone: '',
                cell: '',
                registered: new Date(),
                following: [],
                followers: [],
            })
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                });
        }
    });
};

// used
export const getUser = () => {
    return new Promise((resolve, reject) => {
        if (fire.auth().currentUser !== null) {
            const { uid } = fire.auth().currentUser;
            resolve(uid);
        }
    });
};

/* ------------------------------ */
/* Not used functions */

// no use
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

// no use
export const fillCollection = (collection) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const pictures = doc.data()['pictures'];
                pictures.forEach(picture => {
                    db.collection('pictures').doc(picture.id).set({
                        ...picture,
                    })
                        .then(() => {
                            console.log('Document successfully written!');
                        })
                        .catch((error) => {
                            console.error('Error writing document: ', error);
                        });
                });
            });
            resolve();
        }).catch(error => console.log(error));
    });
};