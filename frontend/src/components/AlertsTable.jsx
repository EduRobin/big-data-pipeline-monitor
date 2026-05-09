function AlertsTable({ alerts, onSelectAlert }) {
    return (
        <div className="card">
            <div className="section-header">
                <div>
                    <h2>Alerts</h2>
                    <p className="muted">
                        Monitoring events created from failed pipeline runs.
                    </p>
                </div>
            </div>

            {alerts.length === 0 ? (
                <p className="muted">No alerts found.</p>
            ) : (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Pipeline</th>
                                <th>Severity</th>
                                <th>Status</th>
                                <th>Message</th>
                            </tr>
                        </thead>

                        <tbody>
                            {alerts.map((alert) => (
                                <tr key={alert._id}>
                                    <td>
                                        <button
                                            className="link-button"
                                            type="button"
                                            onClick={() => onSelectAlert(alert)}
                                        >
                                            {alert.pipelineId?.name || "Unknown pipeline"}
                                        </button>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${alert.severity}`}>
                                            {alert.severity}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={
                                                alert.status === "open"
                                                    ? "badge badge-failed"
                                                    : "badge badge-success"
                                            }
                                        >
                                            {alert.status}
                                        </span>
                                    </td>
                                    <td>{alert.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AlertsTable;