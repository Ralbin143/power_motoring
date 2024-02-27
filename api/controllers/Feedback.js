const FEEDBACKS = require("../models/Feedback");

const addFeedback = async (req, res) => {
  console.log(req.body);

  try {
    // const files = req.files;

    const newFeedback = new FEEDBACKS({
      custName: req.body.custName,
      contactNo: req.body.contactNo,
      email: req.body.email,
      // images: files[0].filename,
      feedback: req.body.feedback,
    });
    const response = await newFeedback.save();

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const viewAllFeedbacks = async (req, res) => {
  try {
    const response = await FEEDBACKS.find().sort({ created_at: -1 });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const viewSingleFeedback = async (req, res) => {
  try {
    const query = {
      _id: req.body.id,
    };
    await FEEDBACKS.find(query)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((e) => {
        return res.status(500).json(e);
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  addFeedback,
  viewAllFeedbacks,
  viewSingleFeedback,
};
