const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        required: true,
        default: new Date
    }
})

module.exports = mongoose.model('admin', AdminSchema)