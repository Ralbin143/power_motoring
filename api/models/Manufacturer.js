const mongoose = require('mongoose')

const manufacturerSchema = new mongoose.Schema({

    manufacturerName: {
        type: String,
        required: true
    },

    manufacturerLogo: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        required: true,
        default: new Date
    }
})

module.exports = mongoose.model('manufacturers', manufacturerSchema)