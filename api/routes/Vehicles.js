const express = require('express')
const router = express.Router()
const {
    addVehicle,
    updateVehicle,
    allVehicles,
    getManufacturerVehicle,
    getSingleVehicle,
    liveSearchVehicle,
    getCategoryFilterVehicle
} = require('../controllers/Vehicles')


router.post('/add_vehicle', addVehicle)
router.post('/update_vehicle', updateVehicle)
router.get('/all_vehicle', allVehicles)
router.post("/get_manufacturer_vehicle", getManufacturerVehicle)
router.post("/get_manufacturer_vehicle_filter", getCategoryFilterVehicle)
router.post('/live_search_vehicle', liveSearchVehicle)
router.post('/get_single_vehicle', getSingleVehicle)


module.exports = router