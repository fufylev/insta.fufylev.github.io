import { db } from './API';

/**
 * Toggle like by current User in Cloud FireSore pictures' collection
 * @param uid {string} - User id
 * @param username {string} - User Name
 * @param picID {string} - pictures id
 * @returns {Promise<unknown>} - {Boolean} - success of toggle
 */
export const togglePictureLikesInGallery = (uid, username, picID) => {
    return new Promise((resolve, reject) => {
        const receivedPicture = db.collection('pictures').doc(picID);
        receivedPicture.get().then((doc) => {
            if (doc.exists) {
                const picture = doc.data();
                const likes = picture.likes;
                const likesAltered = likes.filter(like => like.user.uid !== uid);

                const ifUserLikedPost = likes.length > likesAltered.length;
                if (ifUserLikedPost === true) {
                    receivedPicture.update({
                        likes:likesAltered,
                    })
                        .then(() => {
                            // console.log('Pictures successfully updated!');
                            resolve(true);
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error('Error updating document: ', error);
                            resolve(false);
                        });
                } else {
                    receivedPicture.update({
                        likes: [
                            ...picture.likes,
                            {
                                timestamp: new Date(),
                                user: { uid, username },
                            },
                        ],
                    })
                        .then(() => {
                            // console.log('Pictures successfully updated!');
                            resolve(true);
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error('Error updating document: ', error);
                            resolve(false);
                        });
                }
            } else {
                console.log('No such document!');
            }
        }).catch((error) => {
            reject(error);
        });
    });
};