import { db } from './API';

export const addPost = (newPost, picID) => {
    return new Promise((resolve, reject) => {
        const receivedPicture = db.collection('pictures').doc(picID);
        receivedPicture.get().then((doc) => {
            if (doc.exists) {
                const picture = doc.data();
                receivedPicture.update({
                    comments: [newPost, ...picture.comments]
                })
                    .then(() => {
                        console.log('Document successfully updated!');
                        resolve(true)
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error('Error updating document: ', error);
                        resolve(false)
                    });
            } else {
                console.log('No such document!');
            }
        });
    })

};

