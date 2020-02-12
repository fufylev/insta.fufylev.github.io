class User {
    constructor(pictures) {
        this.pictures = pictures;
    }

    toString() {
        return this.pictures
    }
}

// Firestore data converter
export const picturesConverter = {
    toFirestore: function(pictures) {
        return {
            ...pictures,
        };
    },
    fromFirestore: function(snapshot, options) {
        const data = snapshot.data(options);
        return new User(data.pictures);
    },
};


