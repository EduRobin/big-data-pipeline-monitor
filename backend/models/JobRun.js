const mongoose = require("mongoose");

const jobRunSchema = new mongoose.Schema(
    {
        pipelineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pipeline",
            required: [true, "Pipeline ID is required"],
        },
        pipelineVersion: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "running", "success", "failed"],
            default: "pending",
        },
        startedAt: {
            type: Date,
            default: null,
        },
        finishedAt: {
            type: Date,
            default: null,
        },
        recordsProcessed: {
            type: Number,
            default: 0,
        },
        errorMessage: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("JobRun", jobRunSchema);