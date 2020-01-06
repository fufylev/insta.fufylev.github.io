const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const format = require('date-fns/format');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true });

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use('/', express.static(path.resolve(__dirname, 'public')));

const SECRET = 'The doors are open for those how are bold enough to knock';

const verifyToken = (req, res, next) => {
    if (req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(' ');
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Wrong token' });
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401).json({ message: 'No token present' });
    }
};

const User = require('./models/user');
const Picture = require('./models/picture');

app.post('/register', async (req, res) => {
    const checkMail = await User.findOne({
        mail: req.body.mail,
    });
    const checkMobile = await User.findOne({
        mobile: req.body.mobile,
    });
    if ( !checkMail || !checkMobile ) {
        const user = new User(req.body);
        const savedUser = await user.save();
        return res.json({
            result: 'success',
        });
    }
    res.json({
        result: 'This user already exists',
    });
});

app.post('/auth', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({email: username});
    if ( !user ) {
        return res.json({
            result: 'failure',
            message: 'This user doesn\'t exist',
        });
    }
    const isPasswordValid = await user.comparePassword(password);
    if ( !isPasswordValid ) {
        return res.json({
            result: 'failure',
            message: 'Incorrect password',
        });
    }
    const identity = {
        id: user._id,
        email: user.email,
    };
    const token = jwt.sign(identity, SECRET);
    res.json({
        result: 'success',
        token,
        firstName: user.firstName,
        lastName: user.lastName,
    });
});

app.all('/api*', verifyToken);

app.get('/api/photos', async (req, res) => {
    const { page = 1, limit = 15 } = req.query;
    const photos = await Picture.find()
        .populate([
            'comments.user',
            'likes.user',
            'owner'
        ]).skip(limit * (page - 1)).limit(limit);
    const total = await Picture.countDocuments();
    res.json({
        page,
        total,
        photos,
    });
});

app.get('/api/users/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    user = user.toObject();

    // удаляем пароль
    delete user.password;

    res.json(user);
});

app.get('/api/photos/:id', async (req, res) => {
    const photo = await Picture.findById(req.params.id)
        .populate([
            'comments.user',
            'likes.user',
            'owner'
        ]);
    res.json(photo);
})

app.listen(8888, () => {
    console.log('Server on port 8888 has been started!');
});
