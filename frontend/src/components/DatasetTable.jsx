function DatasetTable({ datasets }) {
    return (
        <div className="card">
            <div className="section-header">
                <div>
                    <h2>Datasets</h2>
                    <p className="muted">Registered metadata-only data sources.</p>
                </div>
            </div>

            {datasets.length === 0 ? (
                <p className="muted">No datasets found.</p>
            ) : (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Owner</th>
                                <th>Schema</th>
                                <th>Created</th>
                            </tr>
                        </thead>

                        <tbody>
                            {datasets.map((dataset) => (
                                <tr key={dataset._id}>
                                    <td>{dataset.name}</td>
                                    <td>{dataset.owner}</td>
                                    <td>v{dataset.schemaVersion}</td>
                                    <td>{formatDate(dataset.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function formatDate(value) {
    if (!value) {
        return "-";
    }

    return new Date(value).toLocaleString("cs-CZ");
}

export default DatasetTable;