const uploadVehicleImage = async (req, res) => {
  try {
    const basePath = process.env.IMAGE_API_URL;
    const path = basePath + "/vehicles/";
    const fileName = path + req.uploadedFilename;
    return res.status(200).json({ fileName: fileName });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { uploadVehicleImage };
