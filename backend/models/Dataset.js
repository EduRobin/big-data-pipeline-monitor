const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Dataset name is required"],
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
        },
        owner: {
            type: String,
            required: [true, "Dataset owner is required"],
            trim: true,
        },
        schemaVersion: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Dataset", datasetSchema);