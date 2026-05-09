const express = require("express");

const {
    createDataset,
    getDatasets,
    getDatasetById,
} = require("../controllers/datasetController");

const router = express.Router();

router.post("/", createDataset);
router.get("/", getDatasets);
router.get("/:id", getDatasetById);

module.exports = router;