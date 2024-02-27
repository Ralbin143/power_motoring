const express = require('express')
const router = express.Router()
const {
    addManufacturer,
    allManufacturers,
    updateManufacturer
} = require('../controllers/Manufacturer')
const { uploadPhoto } = require('../middlewares/uploadImage')

router.post('/add_manufacturer', uploadPhoto.single('logo', 10), addManufacturer)
router.post('/all_manufacturers', allManufacturers)
router.post('/update_manufacturer', uploadPhoto.single('logo', 10), updateManufacturer)

module.exports = router