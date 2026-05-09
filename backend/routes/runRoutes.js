const express = require("express");

const {
    getRuns,
    getRunById,
    updateRunStatus,
} = require("../controllers/runController");

const router = express.Router();

router.get("/", getRuns);
router.get("/:id", getRunById);
router.patch("/:id", updateRunStatus);

module.exports = router;