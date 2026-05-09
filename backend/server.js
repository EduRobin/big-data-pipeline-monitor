const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const datasetRoutes = require("./routes/datasetRoutes");
const pipelineRoutes = require("./routes/pipelineRoutes");
const runRoutes = require("./routes/runRoutes");
const alertRuleRoutes = require("./routes/alertRuleRoutes");
const alertRoutes = require("./routes/alertRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Big Data Pipeline Monitor API is running",
    });
});

app.use("/datasets", datasetRoutes);
app.use("/pipelines", pipelineRoutes);
app.use("/runs", runRoutes);
app.use("/alert-rules", alertRuleRoutes);
app.use("/alerts", alertRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});