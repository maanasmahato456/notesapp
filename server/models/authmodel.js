const mongoose = require('mongoose');

const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();


const authschema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        reqired: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: date
    },
    time: {
        type: String,
        required: true,
        default: time
    }
})

const Auth = mongoose.model('mynotebook-auth', authschema);


module.exports = { Auth };