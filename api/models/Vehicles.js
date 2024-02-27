const mongoose = require('mongoose')

const VehiclesSchema = new mongoose.Schema({

    manufacturerType: {
        type: String,
        required: true
    },
    vehicleCategory: {
        type: String,
        required: true
    },
    vehicleImage: {
        type: String,
        required: true
    },
    vehicle_name: {
        type: String,
        required: true
    },
    vehicleTitleText: {
        type: String,
        required: false
    },
    engineCC: {
        type: String,
        required: true
    },
    maxPower: {
        type: String,
        required: true
    },
    maxTorque: {
        type: String,
        required: true
    },
    groundClearence: {
        type: String,
        required: true
    },
    turningRadius: {
        type: String,
        required: true
    },
    FuelTank: {
        type: String,
        required: true
    },
    wheelBase: {
        type: String,
        required: true
    },
    bootspace: {
        type: String,
        required: true
    },
    dimention: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: false
    },
    variantList: {
        type: Array,
        required: false
    },
    milage: {
        type: String,
        required: false
    },
    tyreSize: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date
    }
})

module.exports = mongoose.model('vehicles', VehiclesSchema)