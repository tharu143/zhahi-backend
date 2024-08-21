// routes/documentUploadRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const documentUploadController = require("../controllers/documentUploadController");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only JPEG, PNG, and PDF files are allowed!"));
  },
});

// Define routes
router.post(
  "/upload",
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "studentProof", maxCount: 1 },
    { name: "studentPicture", maxCount: 1 },
  ]),
  documentUploadController.handleFileUpload
);

module.exports = router;
