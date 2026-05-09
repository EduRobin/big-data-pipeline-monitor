import StatCard from "./StatCard";

function DashboardStats({ datasets, pipelines, runs, alerts }) {
    const activePipelinesCount = pipelines.filter(
        (pipeline) => pipeline.active
    ).length;

    const failedRunsCount = runs.filter((run) => run.status === "failed").length;

    const openAlertsCount = alerts.filter(
        (alert) => alert.status === "open"
    ).length;

    return (
        <section className="dashboard-grid">
            <StatCard label="Datasets" value={datasets.length} />
            <StatCard label="Pipelines" value={pipelines.length} />
            <StatCard label="Active pipelines" value={activePipelinesCount} />
            <StatCard label="Runs" value={runs.length} />
            <StatCard label="Failed runs" value={failedRunsCount} />
            <StatCard label="Open alerts" value={openAlertsCount} />
        </section>
    );
}

export default DashboardStats;