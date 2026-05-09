const AlertEvent = require("../models/AlertEvent");

// GET /alerts
const getAlerts = async (req, res) => {
    try {
        const alerts = await AlertEvent.find()
            .populate("pipelineId")
            .populate("runId")
            .populate("ruleId")
            .sort({ createdAt: -1 });

        return res.status(200).json(alerts);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load alerts",
            error: error.message,
        });
    }
};

// GET /alerts/:id
const getAlertById = async (req, res) => {
    try {
        const alert = await AlertEvent.findById(req.params.id)
            .populate("pipelineId")
            .populate("runId")
            .populate("ruleId");

        if (!alert) {
            return res.status(404).json({
                message: "Alert not found",
            });
        }

        return res.status(200).json(alert);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load alert",
            error: error.message,
        });
    }
};

module.exports = {
    getAlerts,
    getAlertById,
};