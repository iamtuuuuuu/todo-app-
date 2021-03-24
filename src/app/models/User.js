const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserShema = new schema ({
    name: {
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
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', UserShema)

