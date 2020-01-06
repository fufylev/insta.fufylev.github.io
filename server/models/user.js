const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CRYPT_STEPS = 12;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    mobile: {type: String},
    email: {type: String},
    mobileOrEmail: {type: String},
    fullName: {type: String},
    userName: {type: String},
    password: {type: String},
    avatar: { type: String },
    bio: { type: String },
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, CRYPT_STEPS);
    }
    next();
});

userSchema.methods.comparePassword = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');
