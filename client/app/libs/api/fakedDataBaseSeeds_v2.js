const faker = require('faker');
const request = require('request');

const fs = require('fs');

function rand(max = 30) {
    return Math.floor(Math.random() * max);
}

async function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function getImage() {
    return new Promise((resolve, reject) => {
        request({ url: 'https://picsum.photos/500/500', followRedirect: false }, (err, res, body) => {
            resolve(`${res.headers.location}`);
        });
    });
}

async function getUser() {
    return new Promise((resolve, reject) => {
        request({ url: 'https://randomuser.me/api/', followRedirect: false }, (err, res, body) => {
            const user = JSON.parse(body);
            resolve(user[Object.keys(user)[0]][0]);
        });
    });
}

async function importSeeds() {

    // faked users
    const numberOfUsers = 30;
    let users = {};

    for (let i = 0; i < numberOfUsers; i++) {
        const metadata = await getUser();
        const user = {
            uid: i === 0 ? 'zppKmNsSc7O5xtBmcyCP6iV8m4x1' : await generateUID(),
            name: i === 0 ? {
                'title': 'mr',
                'first': 'Test',
                'last': 'User'
            } : metadata.name,
            avatar: metadata.picture,
            email: i === 0 ? 'test-user@gmail.com' : metadata.email,
            dob: metadata.dob.date,
            username: i === 0 ? 'testUser1' : metadata.login.username,
            gender: metadata.gender,
            phone: metadata.phone,
            cell: metadata.cell,
            registered: metadata.registered.date,

        };
        const uid = user.uid;
        users = { ...users, [uid]: user };
        console.log(`${i}Created user ${user.uid} / ${user.name.first} ${user.name.last}`);
    }

    // faked pictures
    const numberOfPictures = 1000;
    let pictures = [];

    for (let i = 0; i < numberOfPictures; i++) {
        const randOwnerData = users[Object.keys(users)[rand(numberOfUsers)]];
        const randOwner = { uid: randOwnerData.uid, username: randOwnerData.username };
        const likes = [];
        const comments = [];

        const likesCount = rand(50);
        const commentsCount = rand(20);

        for (let j = 0; j < likesCount; j++) {
            const randUserData = users[Object.keys(users)[rand(numberOfUsers)]];
            const randUser = { uid: randUserData.uid, username: randUserData.username };
            likes.push({
                user: randUser,
                timestamp: faker.date.past(),
            });
        }

        for (let j = 0; j < commentsCount; j++) {
            const randUserData = users[Object.keys(users)[rand(numberOfUsers)]];
            const randUser = { uid: randUserData.uid, username: randUserData.username };
            comments.push({
                user: randUser,
                text: faker.lorem.sentence(),
                timestamp: faker.date.past(),
            });
        }

        const picture = {
            id: await generateUID(),
            image: await getImage(),
            description: faker.lorem.words(),
            owner: randOwner,
            likes,
            comments,
        };
        pictures = [...pictures, picture];
        console.log(`${i} Created picture for ${randOwner}`);
    }

    Object.keys(users).forEach(key => {
        users = {
            ...users, [key]: {
                ...users[key],
                pictures: pictures.filter(picture => picture.owner.uid === key)
            },
        };
    });

    const initialJson = {}; // пустой массив для первоначального наполнения файла

    let fileName = 'fakedDB_v2.json'; // имя файла или путь к нему

    if (process.argv[2]) {
        fileName = process.argv[2]; // переназначаем имя файла или путь к нему
    }

    // создаем файл если нет с таким именем
    fs.access(fileName, fs.F_OK, (err) => {
        if (err) {
            fs.writeFile(fileName, JSON.stringify(initialJson, null, 4), (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Success');
                }
            });
        }
    });

    let addLog = (log, users) => {
        log = {...users};
        return JSON.stringify(log, null, 4);
    };

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            let newLog = addLog(JSON.parse(data), users);
            fs.writeFile(fileName, newLog, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Success');
                }
            });
        }
    });
}

importSeeds();