import { db, generateID } from './API';
import { userAvatarConverter } from './converters';

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

export const changePost = () => {
    return new Promise((resolve, reject) => {
        const pictures = db.collection('pictures').limit(5);

        pictures.get().then((snapshot) => {
            snapshot.forEach((document) => {
                const receivedPicture = document.data();
                const alteredComments = new Promise((resolve, reject) => {
                    const array = document.data().comments.map((comment, index) => {
                        const avatar = db.collection('users').doc(comment.user.uid)
                            .withConverter(userAvatarConverter);

                        avatar.get().then((doc) => {
                            if (doc.exists) {
                                // console.log('Document data:', doc.data().avatar);
                                return {
                                    ...comment,
                                    user: {
                                        ...comment.user,
                                        avatar: doc.data().avatar
                                    }
                                }
                            } else {
                                // doc.data() will be undefined in this case
                                console.log('No such document!');
                            }
                        }).catch((error) => {
                            console.log('Error getting document:', error);
                        });
                        if (index === document.data().comments.length + 1) {
                            resolve(array)
                        }
                    });
                    resolve(array)
                });
                /**/
                alteredComments.then(data => console.log(data))
            });
            resolve();
        }).catch(error => reject(error));
    })
};