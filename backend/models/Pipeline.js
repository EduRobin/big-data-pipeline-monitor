const mongoose = require("mongoose");

const pipelineSchema = new mongoose.Schema(
    {
        datasetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dataset",
            required: [true, "Dataset ID is required"],
        },
        name: {
            type: String,
            required: [true, "Pipeline name is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        schedule: {
            type: String,
            trim: true,
            default: null,
        },
        active: {
            type: Boolean,
            default: true,
        },
        version: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Pipeline", pipelineSchema);