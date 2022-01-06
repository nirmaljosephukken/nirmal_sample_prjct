const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema ({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    token: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);