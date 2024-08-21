const express = require("express");
const router = express.Router();
const internController = require("../controllers/internController");

router.get("/search", internController.searchInterns);
router.get("/", internController.getInterns);
router.post("/", internController.createIntern);
router.put("/:id", internController.updateIntern);
router.delete("/:id", internController.deleteIntern);

module.exports = router;
