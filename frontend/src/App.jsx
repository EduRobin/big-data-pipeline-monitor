import { useEffect, useState } from "react";
import "./App.css";

import { api } from "./services/api";

import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import DatasetForm from "./components/DatasetForm";
import PipelineForm from "./components/PipelineForm";
import PipelineTable from "./components/PipelineTable";
import RunsTable from "./components/RunsTable";
import DatasetTable from "./components/DatasetTable";
import AlertsTable from "./components/AlertsTable";
import DetailPanel from "./components/DetailPanel";

function App() {
  const [datasets, setDatasets] = useState([]);
  const [pipelines, setPipelines] = useState([]);
  const [runs, setRuns] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [selectedRun, setSelectedRun] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [datasetForm, setDatasetForm] = useState({
    name: "",
    description: "",
    owner: "",
    schemaVersion: 1,
  });

  const [pipelineForm, setPipelineForm] = useState({
    datasetId: "",
    name: "",
    description: "",
    schedule: "0 2 * * *",
    active: true,
    version: 1,
  });

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [datasetsRes, pipelinesRes, runsRes, alertsRes] =
        await Promise.all([
          api.getDatasets(),
          api.getPipelines(),
          api.getRuns(),
          api.getAlerts(),
        ]);

      if (!datasetsRes.ok) {
        throw new Error("Failed to load datasets");
      }

      if (!pipelinesRes.ok) {
        throw new Error("Failed to load pipelines");
      }

      if (!runsRes.ok) {
        throw new Error("Failed to load runs");
      }

      if (!alertsRes.ok) {
        throw new Error("Failed to load alerts");
      }

      const datasetsData = await datasetsRes.json();
      const pipelinesData = await pipelinesRes.json();
      const runsData = await runsRes.json();
      const alertsData = await alertsRes.json();

      setDatasets(datasetsData);
      setPipelines(pipelinesData);
      setRuns(runsData);
      setAlerts(alertsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDatasetChange = (event) => {
    const { name, value } = event.target;

    setDatasetForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handlePipelineChange = (event) => {
    const { name, value, type, checked } = event.target;

    setPipelineForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectPipeline = (pipeline) => {
    setSelectedPipeline(pipeline);
    setSelectedRun(null);
    setSelectedAlert(null);
  };

  const selectRun = (run) => {
    setSelectedPipeline(null);
    setSelectedRun(run);
    setSelectedAlert(null);
  };

  const selectAlert = (alert) => {
    setSelectedPipeline(null);
    setSelectedRun(null);
    setSelectedAlert(alert);
  };

  const closeDetail = () => {
    setSelectedPipeline(null);
    setSelectedRun(null);
    setSelectedAlert(null);
  };

  const createDataset = async (event) => {
    event.preventDefault();

    try {
      setActionLoading(true);
      setActionMessage("");
      setError("");

      const response = await api.createDataset({
        name: datasetForm.name,
        description: datasetForm.description,
        owner: datasetForm.owner,
        schemaVersion: Number(datasetForm.schemaVersion),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create dataset");
      }

      setActionMessage(`Dataset created: ${data.name}`);

      setDatasetForm({
        name: "",
        description: "",
        owner: "",
        schemaVersion: 1,
      });

      await loadDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const createPipeline = async (event) => {
    event.preventDefault();

    try {
      setActionLoading(true);
      setActionMessage("");
      setError("");

      const response = await api.createPipeline({
        datasetId: pipelineForm.datasetId,
        name: pipelineForm.name,
        description: pipelineForm.description,
        schedule: pipelineForm.schedule,
        active: pipelineForm.active,
        version: Number(pipelineForm.version),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create pipeline");
      }

      setActionMessage(`Pipeline created: ${data.name}`);

      setPipelineForm({
        datasetId: "",
        name: "",
        description: "",
        schedule: "0 2 * * *",
        active: true,
        version: 1,
      });

      await loadDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const runPipeline = async (pipelineId) => {
    try {
      setActionLoading(true);
      setActionMessage("");
      setError("");

      const response = await api.runPipeline(pipelineId);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to run pipeline");
      }

      setActionMessage(`Pipeline run created with status: ${data.status}`);

      await loadDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const updateRunStatus = async (runId, status) => {
    try {
      setActionLoading(true);
      setActionMessage("");
      setError("");

      const payload =
        status === "success"
          ? {
            status: "success",
            recordsProcessed: 15200,
          }
          : {
            status: "failed",
            errorMessage: "Manual failure from frontend",
            recordsProcessed: 0,
          };

      const response = await api.updateRunStatus(runId, payload);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update run status");
      }

      setActionMessage(`Run updated to status: ${data.status}`);

      await loadDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="app">
      <Header />

      <main className="content">
        {loading && (
          <section className="card">
            <p className="muted">Loading dashboard data...</p>
          </section>
        )}

        {error && (
          <section className="card">
            <p className="error">Error: {error}</p>
          </section>
        )}

        {actionMessage && (
          <section className="card compact-card">
            <p className="success">{actionMessage}</p>
          </section>
        )}

        {!loading && !error && (
          <>
            <PipelineForm
              datasets={datasets}
              pipelineForm={pipelineForm}
              onPipelineChange={handlePipelineChange}
              onCreatePipeline={createPipeline}
              actionLoading={actionLoading}
            />

            <DatasetForm
              datasetForm={datasetForm}
              onDatasetChange={handleDatasetChange}
              onCreateDataset={createDataset}
              actionLoading={actionLoading}
            />

            <DashboardStats
              datasets={datasets}
              pipelines={pipelines}
              runs={runs}
              alerts={alerts}
            />

            <PipelineTable
              pipelines={pipelines}
              onRunPipeline={runPipeline}
              onRefresh={loadDashboardData}
              actionLoading={actionLoading}
              onSelectPipeline={selectPipeline}
            />

            <RunsTable
              runs={runs}
              onUpdateRunStatus={updateRunStatus}
              actionLoading={actionLoading}
              onSelectRun={selectRun}
            />
            <DetailPanel
              selectedPipeline={selectedPipeline}
              selectedRun={selectedRun}
              selectedAlert={selectedAlert}
              onClose={closeDetail}
            />
            <section className="two-column-grid">
              <DatasetTable datasets={datasets} />
              <AlertsTable alerts={alerts} onSelectAlert={selectAlert} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;