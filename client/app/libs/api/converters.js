/**
 * Firestore data converter for pictures
 */
class Pictures {
    constructor(image, comments, likes, owner, id, description) {
        this.image = image;
        this.comments = comments;
        this.likes = likes;
        this.owner = owner;
        this.id = id;
        this.description = description;
    }
}

/**
 * send a selectable query in order to minimize the size of response data, such as likes and comments
 * are just theirs array length
 * @type {{toFirestore: (function(*): {owner: ({ref: string, type: *}|*|{uid: *, username: *}), image: *, comments: *, description: *, id: *, likes: ([{user: {ref: string, type: *}, timestamp: {default: Date, type: Date | DateConstructor}}]|{user: {ref: string, type: *}, timestamp: {default: Date, type: Date | DateConstructor}}|[]|{user: {uid: string, username: string}, timestamp: Date}|{user: {uid: string, username: string}, timestamp: Date})}), fromFirestore: (function(*, *=): Pictures)}}
 */
export const picturesConverter = {
    toFirestore: function(pictures) {
        return {
            image: pictures.image,
            comments: pictures.comments,
            likes: pictures.likes,
            owner: pictures.owner,
            id: pictures.id,
            description: pictures.description,
        };
    },
    fromFirestore: function(snapshot, options) {
        const data = snapshot.data(options);
        return new Pictures(data.image, data.comments.length, data.likes.length, data.owner, data.id, data.description);
    },
};


class userAvatar {
    constructor(avatar) {
        this.avatar = avatar;
    }
}

export const userAvatarConverter = {
    toFirestore: function(users) {
        return {
            avatar: users.avatar,
        };
    },
    fromFirestore: function(snapshot, options) {
        const data = snapshot.data(options);
        return new userAvatar(data.avatar.thumbnail);
    },
};