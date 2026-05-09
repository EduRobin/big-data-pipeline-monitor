function PipelineTable({ pipelines, onRunPipeline, onRefresh, actionLoading, onSelectPipeline }) {
    return (
        <section className="card">
            <div className="section-header">
                <div>
                    <h2>Pipelines</h2>
                    <p className="muted">
                        List of configured data pipelines with manual run action.
                    </p>
                </div>

                <button className="secondary-button" onClick={onRefresh}>
                    Refresh
                </button>
            </div>

            {pipelines.length === 0 ? (
                <p className="muted">No pipelines found.</p>
            ) : (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Dataset</th>
                                <th>Schedule</th>
                                <th>Status</th>
                                <th>Version</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pipelines.map((pipeline) => (
                                <tr key={pipeline._id}>
                                    <td>
                                        <button
                                            className="link-button"
                                            type="button"
                                            onClick={() => onSelectPipeline(pipeline)}
                                        >
                                            {pipeline.name}
                                        </button>
                                    </td>
                                    <td>{pipeline.datasetId?.name || "Unknown dataset"}</td>
                                    <td>{pipeline.schedule || "-"}</td>
                                    <td>
                                        <span
                                            className={
                                                pipeline.active
                                                    ? "badge badge-success"
                                                    : "badge badge-failed"
                                            }
                                        >
                                            {pipeline.active ? "active" : "inactive"}
                                        </span>
                                    </td>
                                    <td>{pipeline.version}</td>
                                    <td>
                                        <button
                                            className="primary-button"
                                            disabled={!pipeline.active || actionLoading}
                                            onClick={() => onRunPipeline(pipeline._id)}
                                        >
                                            {actionLoading ? "Running..." : "Run pipeline"}
                                        </button>
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

export default PipelineTable;