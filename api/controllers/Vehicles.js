const asyncHandler = require("express-async-handler");
const Vehicles = require("../models/Vehicles");
const { mongoose } = require("mongoose");
const chalk = require("chalk");

const addVehicle = asyncHandler(async (req, res) => {
  const newVehicle = new Vehicles({
    manufacturerType: req.body.manufacturerType,
    vehicleImage: req.body.vehicleImage,
    vehicle_name: req.body.vehicleName,
    engineCC: req.body.engine,
    maxPower: req.body.maxPower,
    maxTorque: req.body.maxTorque,
    groundClearence: req.body.groundClearence,
    turningRadius: req.body.turningRadius,
    FuelTank: req.body.fuelTank,
    wheelBase: req.body.wheelbase,
    bootspace: req.body.bootspace,
    dimention: req.body.diemention,
    images: req.body.images,
    variantList: req.body.variantList,
    milage: req.body.milage,
    tyreSize: req.body.tyreSize,
    vehicleCategory: req.body.vehicleCategory,
  });
  try {
    await newVehicle
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

const updateVehicle = asyncHandler(async (req, res) => {
  const query = {
    _id: req.body.id,
  };

  const data = {
    $set: {
      manufacturerType: req.body.manufacturerType,
      vehicleImage: req.body.vehicleImage,
      vehicle_name: req.body.vehicleName,
      engineCC: req.body.engine,
      maxPower: req.body.maxPower,
      maxTorque: req.body.maxTorque,
      groundClearence: req.body.groundClearence,
      turningRadius: req.body.turningRadius,
      FuelTank: req.body.fuelTank,
      wheelBase: req.body.wheelbase,
      bootspace: req.body.bootspace,
      dimention: req.body.diemention,
      images: req.body.images,
      variantList: req.body.variantList,
      milage: req.body.milage,
      tyreSize: req.body.tyreSize,
      vehicleCategory: req.body.vehicleCategory,
      vehicleTitleText: req.body.vehicleTitle,
    },
  };
  try {
    await Vehicles.updateOne(query, data)
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

const allVehicles = asyncHandler(async (req, res) => {
  try {
    await Vehicles.find()
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

const getManufacturerVehicle = asyncHandler(async (req, res) => {
  const query = {
    manufacturerType: req.body.manufacturer,
  };

  try {
    const vehicles = await Vehicles.find(query).sort({ vehicle_name: 1 });
    const vehiclesz = await Vehicles.find(query);

    const uniqueCategories = ["All"];

    vehiclesz.forEach((element) => {
      if (!uniqueCategories.includes(element.vehicleCategory)) {
        uniqueCategories.push(element.vehicleCategory);
      }
    });

    return res.status(200).json({
      vehicles: vehicles,
      categories: uniqueCategories,
    });
  } catch (error) {
    return res.status(400);
  }
});

const getCategoryFilterVehicle = asyncHandler(async (req, res) => {
  var query = {};
  const queryman = {
    manufacturerType: req.body.manufacturer,
  };
  if (req.body.category === "All") {
    query = {
      manufacturerType: req.body.manufacturer,
    };
  } else {
    query = {
      manufacturerType: req.body.manufacturer,
      vehicleCategory: req.body.category,
    };
  }
  try {
    const vehicles = await Vehicles.find(query).sort({ vehicle_name: 1 });
    const vehiclesz = await Vehicles.find(queryman);
    const uniqueCategories = ["All"];
    vehiclesz.forEach((element) => {
      if (!uniqueCategories.includes(element.vehicleCategory)) {
        uniqueCategories.push(element.vehicleCategory);
      }
    });
    return res.status(200).json({
      vehicles: vehicles,
      categories: uniqueCategories,
    });
  } catch (error) {
    return res.status(400);
  }
});

const liveSearchVehicle = asyncHandler(async (req, res) => {
  const query = {
    $and: [
      {
        manufacturerType: req.body.manufacturer,
      },
      {
        vehicle_name: { $regex: req.body.searchKey, $options: "i" },
      },
    ],
  };

  try {
    const vehicles = await Vehicles.find(query).sort({ vehicle_name: 1 });
    const vehiclesz = await Vehicles.find(query);

    const uniqueCategories = ["All"];

    vehiclesz.forEach((element) => {
      if (!uniqueCategories.includes(element.vehicleCategory)) {
        uniqueCategories.push(element.vehicleCategory);
      }
    });

    return res.status(200).json({
      vehicles: vehicles,
      categories: uniqueCategories,
    });
  } catch (error) {
    return res.status(400);
  }
});

const getSingleVehicle = asyncHandler(async (req, res) => {
  const query = {
    _id: req.body.id,
  };
  try {
    await Vehicles.find(query)
      .then((response) => {

        return res.status(200).json(response);
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
  addVehicle,
  updateVehicle,
  allVehicles,
  getManufacturerVehicle,
  getSingleVehicle,
  liveSearchVehicle,
  getCategoryFilterVehicle,
};
