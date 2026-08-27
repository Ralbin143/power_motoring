const express = require("express");
const { uploadVehiclePhoto } = require("../middlewares/uploadImage");
const { uploadVehicleImage } = require("../controllers/UploadController");
const router = express.Router();

router.post("/", uploadVehiclePhoto.single("image", 1), uploadVehicleImage);

module.exports = router;
