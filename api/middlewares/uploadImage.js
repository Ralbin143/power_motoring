const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/manufacturers/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + "-" + uniquesuffix + ".png";
    req.uploadedFilename = filename; // Attach the filename to the request object
    cb(null, filename);
  },
});

const feedbackstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/feedback/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + "-" + uniquesuffix + ".png";
    req.uploadedFilename = filename; // Attach the filename to the request object
    cb(null, filename);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};
const feedbackmulterFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 100000000 },
});

const uploadFeedbackPhoto = multer({
  storage: feedbackstorage,
  // fileFilter: feedbackmulterFilter,
  // limits: { fileSize: 100000000 },
});

module.exports = { uploadPhoto, uploadFeedbackPhoto };
