function DatasetForm({
    datasetForm,
    onDatasetChange,
    onCreateDataset,
    actionLoading,
}) {
    return (
        <section className="card">
            <div className="section-header">
                <div>
                    <h2>Create dataset</h2>
                    <p className="muted">
                        Register a metadata-only data source used by pipelines.
                    </p>
                </div>
            </div>

            <form className="form-grid" onSubmit={onCreateDataset}>
                <div className="form-field">
                    <label>Dataset name</label>
                    <input
                        type="text"
                        name="name"
                        value={datasetForm.name}
                        onChange={onDatasetChange}
                        placeholder="customer_events"
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Owner</label>
                    <input
                        type="text"
                        name="owner"
                        value={datasetForm.owner}
                        onChange={onDatasetChange}
                        placeholder="analytics-team"
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={datasetForm.description}
                        onChange={onDatasetChange}
                        placeholder="Customer events from web app"
                    />
                </div>

                <div className="form-field">
                    <label>Schema version</label>
                    <input
                        type="number"
                        name="schemaVersion"
                        value={datasetForm.schemaVersion}
                        onChange={onDatasetChange}
                        min="1"
                    />
                </div>

                <div className="form-actions">
                    <button className="primary-button" type="submit" disabled={actionLoading}>
                        {actionLoading ? "Creating..." : "Create dataset"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default DatasetForm;