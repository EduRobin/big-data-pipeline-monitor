const mongoose = require("mongoose");

const alertEventSchema = new mongoose.Schema(
    {
        ruleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AlertRule",
            default: null,
        },
        pipelineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pipeline",
            required: [true, "Pipeline ID is required"],
        },
        runId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobRun",
            required: [true, "Run ID is required"],
        },
        message: {
            type: String,
            required: [true, "Alert message is required"],
            trim: true,
        },
        severity: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "high",
        },
        status: {
            type: String,
            enum: ["open", "resolved"],
            default: "open",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("AlertEvent", alertEventSchema);