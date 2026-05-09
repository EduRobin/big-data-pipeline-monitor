function RunsTable({ runs, onUpdateRunStatus, actionLoading, onSelectRun }) {
    return (
        <section className="card">
            <div className="section-header">
                <div>
                    <h2>Recent pipeline runs</h2>
                    <p className="muted">
                        Latest simulated executions of data pipelines.
                    </p>
                </div>
            </div>

            {runs.length === 0 ? (
                <p className="muted">No runs found.</p>
            ) : (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Pipeline</th>
                                <th>Status</th>
                                <th>Started</th>
                                <th>Finished</th>
                                <th>Records</th>
                                <th>Error</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {runs.slice(0, 10).map((run) => (
                                <tr key={run._id}>
                                    <td>
                                        <button
                                            className="link-button"
                                            type="button"
                                            onClick={() => onSelectRun(run)}
                                        >
                                            {run.pipelineId?.name || "Unknown pipeline"}
                                        </button>
                                    </td>

                                    <td>
                                        <span className={`badge badge-${run.status}`}>
                                            {run.status}
                                        </span>
                                    </td>

                                    <td>{formatDate(run.startedAt)}</td>
                                    <td>{formatDate(run.finishedAt)}</td>
                                    <td>{run.recordsProcessed}</td>
                                    <td>{run.errorMessage || "-"}</td>

                                    <td>
                                        {run.status === "running" ? (
                                            <div className="run-actions">
                                                <button
                                                    className="small-success-button"
                                                    disabled={actionLoading}
                                                    onClick={() => onUpdateRunStatus(run._id, "success")}
                                                >
                                                    Success
                                                </button>

                                                <button
                                                    className="small-danger-button"
                                                    disabled={actionLoading}
                                                    onClick={() => onUpdateRunStatus(run._id, "failed")}
                                                >
                                                    Failed
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="muted">Finished</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

function formatDate(value) {
    if (!value) {
        return "-";
    }

    return new Date(value).toLocaleString("cs-CZ");
}

export default RunsTable;