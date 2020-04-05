const faker = require('faker');
const request = require('request');

const fs = require('fs');

function rand(max = 30) {
    return Math.floor(Math.random() * max);
}

async function generateID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function getImage() {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            request({ url: 'https://source.unsplash.com/random/800x300', followRedirect: false }, (err, res, body) => {
                resolve(`${res.headers.location}`);
            });
        }, 4000)

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
    let dataFake = [];
    for (let i = 0; i < 20; i++) {
        dataFake = [...dataFake, {
            id: await generateID(),
            img: await getImage(),
            text: faker.lorem.sentence(),
            date: faker.date.past(),
            booked: Math.random() < 0.5,
        }];
        console.log(i);
    }

    const initialJson = []; // пустой массив для первоначального наполнения файла

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

    let addLog = (log, dataFake) => {
        log = [...dataFake];
        return JSON.stringify(log, null, 4);
    };

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            let newLog = addLog(JSON.parse(data), dataFake);
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