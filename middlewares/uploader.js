const multer = require("multer");
const path = require("path");
const express = require("express");
const app = express();

const multerFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    console.log("Invalid image file format type");
    throw new Error("Invalid image file format type");
  }
};

const upload = multer({
  fileFilter: multerFilter,
  //   dest: "public/images/users",
});

module.exports = upload;
