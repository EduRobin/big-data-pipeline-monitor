const express = require("express");

const {
    createAlertRule,
    getAlertRules,
    getAlertRuleById,
    updateAlertRule,
    deleteAlertRule,
} = require("../controllers/AlertRuleController");

const router = express.Router();

router.post("/", createAlertRule);
router.get("/", getAlertRules);
router.get("/:id", getAlertRuleById);
router.patch("/:id", updateAlertRule);
router.delete("/:id", deleteAlertRule);

module.exports = router;