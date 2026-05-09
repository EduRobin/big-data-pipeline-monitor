const API_URL = "http://localhost:5000";

export const api = {
    getDatasets: () => fetch(`${API_URL}/datasets`),

    createDataset: (data) =>
        fetch(`${API_URL}/datasets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }),

    getPipelines: () => fetch(`${API_URL}/pipelines`),

    createPipeline: (data) =>
        fetch(`${API_URL}/pipelines`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }),

    runPipeline: (pipelineId) =>
        fetch(`${API_URL}/pipelines/${pipelineId}/run`, {
            method: "POST",
        }),

    getRuns: () => fetch(`${API_URL}/runs`),

    updateRunStatus: (runId, data) =>
        fetch(`${API_URL}/runs/${runId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }),

    getAlerts: () => fetch(`${API_URL}/alerts`),
};