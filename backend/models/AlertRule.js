const mongoose = require("mongoose");

const alertRuleSchema = new mongoose.Schema(
    {
        pipelineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pipeline",
            required: [true, "Pipeline ID is required"],
        },
        name: {
            type: String,
            required: [true, "Alert rule name is required"],
            trim: true,
        },
        type: {
            type: String,
            enum: ["status_failed", "runtime_threshold"],
            default: "status_failed",
        },
        thresholdMinutes: {
            type: Number,
            default: null,
        },
        enabled: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("AlertRule", alertRuleSchema);