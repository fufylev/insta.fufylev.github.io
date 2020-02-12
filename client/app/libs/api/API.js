import firebase from 'firebase';
import 'firebase/app';
import {picturesConverter} from './converters';

require('firebase/firestore');

export const firebaseConfig = {
    apiKey: 'AIzaSyDV_nIYcvEbvHUAwDCgiya3TPVCr43Fzg4',
    authDomain: 'insta-andrey-f.firebaseapp.com',
    databaseURL: 'https://insta-andrey-f.firebaseio.com',
    projectId: 'insta-andrey-f',
    storageBucket: 'insta-andrey-f.appspot.com',
    messagingSenderId: '510498654768',
    appId: '1:510498654768:web:9c5b79ee428525a5bd7bf5',
    measurementId: 'G-ZHTYBPCLQ7'
};

export const fire = firebase.initializeApp(firebaseConfig);
export const db = fire.firestore();

export const getCustom = () => {
    db.collection('users')
        .withConverter(picturesConverter)
        .get().then((querySnapshot) => {
            let metadata = {};
            querySnapshot.forEach((doc) => {
                const id = doc.id;
                metadata = { ...metadata, [id]: doc.data()['pictures'] };
            });
            console.log(metadata);
        }).catch((error) => {
            console.log('Error getting document:', error);
        });
};

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

export const fillCollection = (collection) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const pictures = doc.data()['pictures'];
                pictures.forEach(picture => {
                    db.collection('pictures').doc(picture.id).set({
                        ...picture
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

export const checkIfUserMetadataExists = (uid) => {
    return new Promise((resolve, reject) => {
        const user = db.collection('users').doc(uid);
        user.get().then((doc) => {
            if (doc.exists) {
                resolve({ifExists: true, metadata: doc.data()});
            } else {
                resolve({ifExists: false});
            }
        }).catch((error) => {
            console.log('Error getting document:', error);
        });
    });

};

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
                    'last': ''
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
                pictures: []
            })
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                });
        }
    })
};

export const getUser = () => {
    return new Promise((resolve, reject) => {
        if (fire.auth().currentUser !== null) {
            const { uid } = fire.auth().currentUser;
            resolve(uid)
        }
    })
};

// for future use
/*export const updateUser = () => {
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
/*getCollection('users').then(metadata => {
            const user = db.collection('users').doc('Enjq5LAQ1Xavcvwzae7d2orsdR93');
            let usersArr = [];
            for (let i = 0; i < 15; i++) {
                usersArr = [...usersArr, Object.keys(metadata)[this.rand(50)]];
            }

            user.update({
                pictures: pics[46],
                followings: usersArr,
                dob: {age:28, date: '1992-05-23T21:05:33.508Z'},
                avatar: {
                    large: 'https://randomuser.me/api/portraits/men/51.jpg',
                    medium: 'https://randomuser.me/api/portraits/med/men/51.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/thumb/men/51.jpg'
                },
            })
                .then(() => {
                    console.log('Document successfully updated!');
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error('Error updating document: ', error);
                });
        });
        */
/*Object.keys(users).forEach(key => {
            db.collection('users').doc(key).set({
                ...users[key]
            })
                .then(() => {
                    console.log('Document successfully written!');
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                });
        })*/