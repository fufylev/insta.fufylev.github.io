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

export const read = (url) => {
    return database.ref(url).once('value').then((snapshot) => {
        return snapshot.val();
    });
};

export const writeUserData = (uid, name, email, imageUrl) => {
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
};

// this.updateUser();
// user in DB
/*if (fire.auth().currentUser !== null) {
    const {uid, email, displayName, photoURL} = fire.auth().currentUser;
    const user = fire.auth().currentUser;
    console.log(user);
    this.writeUserData(uid, displayName, email, photoURL)
}*/