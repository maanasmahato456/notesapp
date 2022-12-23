const mongoose = require('mongoose');

const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();


const noteschema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mynotebook-auth"
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        reqired: true
    },
    tag: {
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

const Note = mongoose.model('mynotebook-note', noteschema);


module.exports = { Note };