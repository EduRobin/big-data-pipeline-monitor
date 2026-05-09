const AlertRule = require("../models/AlertRule");
const Pipeline = require("../models/Pipeline");

// POST /alert-rules
const createAlertRule = async (req, res) => {
    try {
        const { pipelineId, name, type, thresholdMinutes, enabled } = req.body;

        if (!pipelineId || !name) {
            return res.status(400).json({
                message: "Pipeline ID and alert rule name are required",
            });
        }

        const pipeline = await Pipeline.findById(pipelineId);

        if (!pipeline) {
            return res.status(404).json({
                message:
                    "Pipeline not found. Alert rule cannot be created without existing pipeline.",
            });
        }

        const alertRule = await AlertRule.create({
            pipelineId,
            name,
            type,
            thresholdMinutes,
            enabled,
        });

        const populatedRule = await AlertRule.findById(alertRule._id).populate(
            "pipelineId"
        );

        return res.status(201).json(populatedRule);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create alert rule",
            error: error.message,
        });
    }
};

// GET /alert-rules
const getAlertRules = async (req, res) => {
    try {
        const alertRules = await AlertRule.find()
            .populate("pipelineId")
            .sort({ createdAt: -1 });

        return res.status(200).json(alertRules);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load alert rules",
            error: error.message,
        });
    }
};

// GET /alert-rules/:id
const getAlertRuleById = async (req, res) => {
    try {
        const alertRule = await AlertRule.findById(req.params.id).populate(
            "pipelineId"
        );

        if (!alertRule) {
            return res.status(404).json({
                message: "Alert rule not found",
            });
        }

        return res.status(200).json(alertRule);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load alert rule",
            error: error.message,
        });
    }
};

// PATCH /alert-rules/:id
const updateAlertRule = async (req, res) => {
    try {
        const { name, type, thresholdMinutes, enabled } = req.body;

        const alertRule = await AlertRule.findById(req.params.id);

        if (!alertRule) {
            return res.status(404).json({
                message: "Alert rule not found",
            });
        }

        if (name !== undefined) {
            alertRule.name = name;
        }

        if (type !== undefined) {
            alertRule.type = type;
        }

        if (thresholdMinutes !== undefined) {
            alertRule.thresholdMinutes = thresholdMinutes;
        }

        if (enabled !== undefined) {
            alertRule.enabled = enabled;
        }

        await alertRule.save();

        const populatedRule = await AlertRule.findById(alertRule._id).populate(
            "pipelineId"
        );

        return res.status(200).json(populatedRule);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update alert rule",
            error: error.message,
        });
    }
};

// DELETE /alert-rules/:id
const deleteAlertRule = async (req, res) => {
    try {
        const alertRule = await AlertRule.findById(req.params.id);

        if (!alertRule) {
            return res.status(404).json({
                message: "Alert rule not found",
            });
        }

        await alertRule.deleteOne();

        return res.status(200).json({
            message: "Alert rule deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete alert rule",
            error: error.message,
        });
    }
};

module.exports = {
    createAlertRule,
    getAlertRules,
    getAlertRuleById,
    updateAlertRule,
    deleteAlertRule,
};