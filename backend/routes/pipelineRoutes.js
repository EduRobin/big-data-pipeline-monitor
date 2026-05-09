const express = require("express");

const {
    createPipeline,
    getPipelines,
    getPipelineById,
    runPipeline
} = require("../controllers/pipelineController");

const router = express.Router();

router.post("/", createPipeline);
router.get("/", getPipelines);
router.get("/:id", getPipelineById);
router.post("/:id/run", runPipeline);

module.exports = router;