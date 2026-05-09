function PipelineForm({
    datasets,
    pipelineForm,
    onPipelineChange,
    onCreatePipeline,
    actionLoading,
}) {
    return (
        <section className="card">
            <div className="section-header">
                <div>
                    <h2>Create pipeline</h2>
                    <p className="muted">
                        Create a simulated data processing pipeline over an existing dataset.
                    </p>
                </div>
            </div>

            <form className="form-grid pipeline-form-grid" onSubmit={onCreatePipeline}>
                <div className="form-field">
                    <label>Dataset</label>
                    <select
                        name="datasetId"
                        value={pipelineForm.datasetId}
                        onChange={onPipelineChange}
                        required
                    >
                        <option value="">Select dataset</option>
                        {datasets.map((dataset) => (
                            <option key={dataset._id} value={dataset._id}>
                                {dataset.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label>Pipeline name</label>
                    <input
                        type="text"
                        name="name"
                        value={pipelineForm.name}
                        onChange={onPipelineChange}
                        placeholder="daily-log-processing"
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={pipelineForm.description}
                        onChange={onPipelineChange}
                        placeholder="Daily processing of application logs"
                    />
                </div>

                <div className="form-field">
                    <label>Schedule</label>
                    <input
                        type="text"
                        name="schedule"
                        value={pipelineForm.schedule}
                        onChange={onPipelineChange}
                        placeholder="0 2 * * *"
                    />
                </div>

                <div className="form-field">
                    <label>Version</label>
                    <input
                        type="number"
                        name="version"
                        value={pipelineForm.version}
                        onChange={onPipelineChange}
                        min="1"
                    />
                </div>

                <div className="checkbox-field">
                    <label>
                        <input
                            type="checkbox"
                            name="active"
                            checked={pipelineForm.active}
                            onChange={onPipelineChange}
                        />
                        Active pipeline
                    </label>
                </div>

                <div className="form-actions">
                    <button className="primary-button" type="submit" disabled={actionLoading}>
                        {actionLoading ? "Creating..." : "Create pipeline"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default PipelineForm;