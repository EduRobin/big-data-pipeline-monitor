function DetailPanel({ selectedPipeline, selectedRun, selectedAlert, onClose }) {
    if (!selectedPipeline && !selectedRun && !selectedAlert) {
        return null;
    }

    return (
        <section className="card detail-panel">
            <div className="section-header">
                <div>
                    <h2>Selected detail</h2>
                    <p className="muted">
                        Detail information about selected pipeline, run or alert.
                    </p>
                </div>

                <button className="secondary-button" onClick={onClose}>
                    Close detail
                </button>
            </div>

            {selectedPipeline && (
                <div className="detail-content">
                    <h3>Pipeline detail</h3>

                    <div className="detail-grid">
                        <DetailItem label="Name" value={selectedPipeline.name} />
                        <DetailItem
                            label="Dataset"
                            value={selectedPipeline.datasetId?.name || "Unknown dataset"}
                        />
                        <DetailItem
                            label="Description"
                            value={selectedPipeline.description || "-"}
                        />
                        <DetailItem label="Schedule" value={selectedPipeline.schedule || "-"} />
                        <DetailItem
                            label="Status"
                            value={selectedPipeline.active ? "active" : "inactive"}
                        />
                        <DetailItem label="Version" value={selectedPipeline.version} />
                        <DetailItem
                            label="Created"
                            value={formatDate(selectedPipeline.createdAt)}
                        />
                        <DetailItem
                            label="Updated"
                            value={formatDate(selectedPipeline.updatedAt)}
                        />
                    </div>
                </div>
            )}

            {selectedRun && (
                <div className="detail-content">
                    <h3>Run detail</h3>

                    <div className="detail-grid">
                        <DetailItem
                            label="Pipeline"
                            value={selectedRun.pipelineId?.name || "Unknown pipeline"}
                        />
                        <DetailItem label="Status" value={selectedRun.status} />
                        <DetailItem
                            label="Pipeline version"
                            value={selectedRun.pipelineVersion}
                        />
                        <DetailItem label="Started" value={formatDate(selectedRun.startedAt)} />
                        <DetailItem
                            label="Finished"
                            value={formatDate(selectedRun.finishedAt)}
                        />
                        <DetailItem
                            label="Runtime"
                            value={calculateRuntime(selectedRun.startedAt, selectedRun.finishedAt)}
                        />
                        <DetailItem
                            label="Records processed"
                            value={selectedRun.recordsProcessed}
                        />
                        <DetailItem
                            label="Error message"
                            value={selectedRun.errorMessage || "-"}
                        />
                    </div>
                </div>
            )}

            {selectedAlert && (
                <div className="detail-content">
                    <h3>Alert detail</h3>

                    <div className="detail-grid">
                        <DetailItem
                            label="Pipeline"
                            value={selectedAlert.pipelineId?.name || "Unknown pipeline"}
                        />
                        <DetailItem
                            label="Related run status"
                            value={selectedAlert.runId?.status || "-"}
                        />
                        <DetailItem
                            label="Rule"
                            value={selectedAlert.ruleId?.name || "No rule assigned"}
                        />
                        <DetailItem label="Severity" value={selectedAlert.severity} />
                        <DetailItem label="Status" value={selectedAlert.status} />
                        <DetailItem label="Message" value={selectedAlert.message} />
                        <DetailItem
                            label="Created"
                            value={formatDate(selectedAlert.createdAt)}
                        />
                        <DetailItem
                            label="Updated"
                            value={formatDate(selectedAlert.updatedAt)}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className="detail-item">
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

function formatDate(value) {
    if (!value) {
        return "-";
    }

    return new Date(value).toLocaleString("cs-CZ");
}

function calculateRuntime(startedAt, finishedAt) {
    if (!startedAt || !finishedAt) {
        return "-";
    }

    const start = new Date(startedAt);
    const finish = new Date(finishedAt);
    const diffInSeconds = Math.round((finish - start) / 1000);

    return `${diffInSeconds} seconds`;
}

export default DetailPanel;