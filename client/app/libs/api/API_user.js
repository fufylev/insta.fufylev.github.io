import { db } from './API';
import { userAvatarConverter } from './converters';

export const getUserAvatar = (uid) => {
    return new Promise((res, rej) => {
        const avatar = db.collection('users').doc(uid)
            .withConverter(userAvatarConverter);

        avatar.get().then((doc) => {
            if (doc.exists) {
                // console.log('Document data:', doc.data().avatar);
                res(doc.data().avatar);
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
            }
        }).catch((error) => {
            console.log('Error getting document:', error);
        });
    })

};