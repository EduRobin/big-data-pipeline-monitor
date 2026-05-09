const Dataset = require("../models/Dataset");

// POST /datasets
// Vytvoření nového datasetu
const createDataset = async (req, res) => {
    try {
        const { name, description, owner, schemaVersion } = req.body;

        if (!name || !owner) {
            return res.status(400).json({
                message: "Name and owner are required",
            });
        }

        const dataset = await Dataset.create({
            name,
            description,
            owner,
            schemaVersion,
        });

        return res.status(201).json(dataset);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create dataset",
            error: error.message,
        });
    }
};

// GET /datasets
// Získání všech datasetů
const getDatasets = async (req, res) => {
    try {
        const datasets = await Dataset.find().sort({ createdAt: -1 });

        return res.status(200).json(datasets);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load datasets",
            error: error.message,
        });
    }
};

// GET /datasets/:id
// Získání jednoho datasetu podle ID
const getDatasetById = async (req, res) => {
    try {
        const dataset = await Dataset.findById(req.params.id);

        if (!dataset) {
            return res.status(404).json({
                message: "Dataset not found",
            });
        }

        return res.status(200).json(dataset);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load dataset",
            error: error.message,
        });
    }
};

module.exports = {
    createDataset,
    getDatasets,
    getDatasetById,
};