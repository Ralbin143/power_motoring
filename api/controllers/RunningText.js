const RUNNIG_TEXT = require("../models/runningText");

const newRunningText = async (req, res) => {
  try {
    const newRunningText = new RUNNIG_TEXT({
      runningText: req.body.text,
    });
    const data = await newRunningText.save();
    return res.status(200).json(data);
  } catch (error) {
    return;
  }
};

const getRunningText = async (req, res) => {
  try {
    const data = await RUNNIG_TEXT.find();
    return res.status(200).json(data);
  } catch (error) {
    return;
  }
};

module.exports = {
  getRunningText,
  newRunningText,
};
