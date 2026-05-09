const Pipeline = require("../models/Pipeline");
const Dataset = require("../models/Dataset");
const JobRun = require("../models/JobRun");

// POST /pipelines
// Vytvoření nové pipeline
const createPipeline = async (req, res) => {
    try {
        const { datasetId, name, description, schedule, active, version } = req.body;

        if (!datasetId || !name) {
            return res.status(400).json({
                message: "Dataset ID and pipeline name are required",
            });
        }

        const dataset = await Dataset.findById(datasetId);

        if (!dataset) {
            return res.status(404).json({
                message: "Dataset not found. Pipeline cannot be created without existing dataset.",
            });
        }

        const pipeline = await Pipeline.create({
            datasetId,
            name,
            description,
            schedule,
            active,
            version,
        });

        const populatedPipeline = await Pipeline.findById(pipeline._id).populate(
            "datasetId"
        );

        return res.status(201).json(populatedPipeline);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create pipeline",
            error: error.message,
        });
    }
};

// GET /pipelines
// Získání všech pipeline
const getPipelines = async (req, res) => {
    try {
        const pipelines = await Pipeline.find()
            .populate("datasetId")
            .sort({ createdAt: -1 });

        return res.status(200).json(pipelines);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load pipelines",
            error: error.message,
        });
    }
};

// GET /pipelines/:id
// Získání jedné pipeline podle ID
const getPipelineById = async (req, res) => {
    try {
        const pipeline = await Pipeline.findById(req.params.id).populate(
            "datasetId"
        );

        if (!pipeline) {
            return res.status(404).json({
                message: "Pipeline not found",
            });
        }

        return res.status(200).json(pipeline);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load pipeline",
            error: error.message,
        });
    }
};

// POST /pipelines/:id/run
// Simulované spuštění pipeline
const runPipeline = async (req, res) => {
    try {
        const pipeline = await Pipeline.findById(req.params.id);

        if (!pipeline) {
            return res.status(404).json({
                message: "Pipeline not found",
            });
        }

        if (!pipeline.active) {
            return res.status(400).json({
                message: "Cannot run inactive pipeline",
            });
        }

        const run = await JobRun.create({
            pipelineId: pipeline._id,
            pipelineVersion: pipeline.version,
            status: "running",
            startedAt: new Date(),
            finishedAt: null,
            recordsProcessed: 0,
            errorMessage: null,
        });

        const populatedRun = await JobRun.findById(run._id).populate("pipelineId");

        return res.status(201).json(populatedRun);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to run pipeline",
            error: error.message,
        });
    }
};

module.exports = {
    createPipeline,
    getPipelines,
    getPipelineById,
    runPipeline,
};