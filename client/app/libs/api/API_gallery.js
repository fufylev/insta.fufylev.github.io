import { db, fire } from './API';
import { picturesConverter } from './converters';

/**
 *
 */
export const getCustom = () => {
    db.collection('pictures')
        .withConverter(picturesConverter)
        .orderBy('id')
        .limit(24)
        .get().then((querySnapshot) => {
            // let metadata = {};
            querySnapshot.forEach((doc) => {
                // const id = doc.id;
                // metadata = { ...metadata, [id]: doc.data()['pictures'] };
                console.log(doc.data());
            });
            // console.log(metadata);
        }).catch((error) => {
            console.log('Error getting document:', error);
        });
};

export const getPicture = (id) => {
    return new Promise((resolve, reject) => {
        const picture = db.collection('pictures').doc(id);

        picture.get().then((doc) => {
            if (doc.exists) {
                // console.log('Document data:', doc.data());
                resolve(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
                resolve(undefined);
            }
        }).catch((error) => {
            console.log('Error getting document:', error);
            reject(error);
        });
    });
};

export const getUserPictures = (user) => {
    return new Promise((resolve, reject) => {
        const picture = db.collection('pictures')
            .withConverter(picturesConverter)
            .where('owner', '==', {
                uid: user.uid,
                username: user.username,
            });
        // fill the pictures with the entries
        let pictures = []; // empty object
        picture.get().then((snapshot) => {
            snapshot.forEach((document) => {
                pictures = [ ...pictures, document.data() ];
            });
            resolve(pictures);
        }).catch(error => reject(error));
    });
};

/**
 *
 * @returns {Promise<unknown>}
 */
export function loadFirstSetOfPictures(user) {
    return new Promise((resolve, reject) => {
        // get first items from the DB
        const uid = localStorage.getItem('uid');
        let first = db.collection('pictures')
            .withConverter(picturesConverter)
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

/**
 *
 * @param lastVisible
 * @returns {Promise<unknown>}
 */
export function loadNextSetOfPictures(lastVisible) {
    return new Promise((resolve, reject) => {
        // get next items from the DB
        let query = db.collection('pictures')
            .withConverter(picturesConverter)
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