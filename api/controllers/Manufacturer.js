const asyncHandler = require("express-async-handler");
const Manufacturer = require("../models/Manufacturer");

const addManufacturer = asyncHandler(async (req, res) => {
  const save_manufacture = new Manufacturer({
    manufacturerName: req.body.manufactname,
    manufacturerLogo: req.uploadedFilename,
  });
  try {
    await save_manufacture
      .save()
      .then((response) => {
        return res.status(200).json({
          data: response,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
});

const allManufacturers = asyncHandler(async (req, res) => {
 
  try {
    await Manufacturer.find()
      .then((response) => {

      
        return res.status(200).json({
          data: response,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
});

const updateManufacturer = asyncHandler(async (req, res) => {
 

  const query = {
    _id: req.body.id,
  };
  const data = {
    $set: {
      manufacturerName: req.body.manufactname,
      manufacturerLogo: req.uploadedFilename,
    },
  };
  try {
    await Manufacturer.updateOne(query, data)
      .then((response) => {
        return res.status(200).json({
          data: response,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
});

module.exports = {
  addManufacturer,
  allManufacturers,
  updateManufacturer,
};
