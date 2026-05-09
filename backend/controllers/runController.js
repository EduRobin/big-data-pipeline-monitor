const JobRun = require("../models/JobRun");
const AlertRule = require("../models/AlertRule");
const AlertEvent = require("../models/AlertEvent");

// GET /runs
// Získání všech běhů pipeline
const getRuns = async (req, res) => {
    try {
        const runs = await JobRun.find()
            .populate("pipelineId")
            .sort({ createdAt: -1 });

        return res.status(200).json(runs);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load runs",
            error: error.message,
        });
    }
};

// GET /runs/:id
// Získání jednoho běhu podle ID
const getRunById = async (req, res) => {
    try {
        const run = await JobRun.findById(req.params.id).populate("pipelineId");

        if (!run) {
            return res.status(404).json({
                message: "Run not found",
            });
        }

        return res.status(200).json(run);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load run",
            error: error.message,
        });
    }
};

// PATCH /runs/:id
// Změna stavu běhu pipeline
const updateRunStatus = async (req, res) => {
    try {
        const { status, recordsProcessed, errorMessage } = req.body;

        const allowedStatuses = ["pending", "running", "success", "failed"];

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status. Allowed statuses are: pending, running, success, failed",
            });
        }

        const run = await JobRun.findById(req.params.id);

        if (!run) {
            return res.status(404).json({
                message: "Run not found",
            });
        }

        const currentStatus = run.status;

        const validTransitions = {
            pending: ["running"],
            running: ["success", "failed"],
            success: [],
            failed: [],
        };

        if (!validTransitions[currentStatus].includes(status)) {
            return res.status(400).json({
                message: `Invalid status transition from ${currentStatus} to ${status}`,
            });
        }

        run.status = status;

        if (recordsProcessed !== undefined) {
            run.recordsProcessed = recordsProcessed;
        }

        if (status === "success" || status === "failed") {
            run.finishedAt = new Date();
        }

        if (status === "failed") {
            run.errorMessage = errorMessage || "Pipeline run failed";
        }

        if (status === "success") {
            run.errorMessage = null;
        }

        await run.save();

        if (status === "failed") {
            const alertRule = await AlertRule.findOne({
                pipelineId: run.pipelineId,
                type: "status_failed",
                enabled: true,
            });

            await AlertEvent.create({
                ruleId: alertRule ? alertRule._id : null,
                pipelineId: run.pipelineId,
                runId: run._id,
                message: `Pipeline run failed: ${run.errorMessage}`,
                severity: "high",
                status: "open",
            });
        }

        const populatedRun = await JobRun.findById(run._id).populate("pipelineId");

        return res.status(200).json(populatedRun);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update run",
            error: error.message,
        });
    }
};

module.exports = {
    getRuns,
    getRunById,
    updateRunStatus,
};