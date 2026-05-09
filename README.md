# Big Data Pipeline Monitor

Big Data Pipeline Monitor je školní full-stack webová aplikace pro evidenci, spouštění a monitoring datových pipeline.

Projekt simuluje základní principy orchestrace a monitoringu datových procesů podobně jako systémy typu Apache Airflow, Databricks Jobs nebo AWS Glue. Aplikace ale neprovádí skutečné distribuované výpočty nad big data soubory. Cílem projektu je ukázat návrh klient-server aplikace, práci s REST API, backend architekturu, frontend v Reactu a základní business logiku kolem pipeline, běhů a alertů.

---

## Obsah projektu

Aplikace umožňuje:

- evidovat datasety,
- vytvářet pipeline nad existujícím datasetem,
- spouštět pipeline,
- vytvářet simulované běhy pipeline,
- měnit stav běhu na `success` nebo `failed`,
- automaticky vytvářet alert při chybovém běhu,
- zobrazovat dashboard se statistikami,
- zobrazovat seznamy datasetů, pipeline, runů a alertů,
- zobrazovat detail pipeline, detail runu a detail alertu.

Projekt je rozdělen na dvě části:

```txt
big-data-pipeline-monitor/
├── backend/
└── frontend/

Použité technologie
Backend
    Node.js
    Express.js
    MongoDB
    Mongoose
    dotenv
    cors
    nodemon
Frontend
    React
    Vite
    Fetch API
    CSS
Databáze
    MongoDB spuštěná lokálně

Struktura projektu
big-data-pipeline-monitor/
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── alertController.js
│   │   ├── alertRuleController.js
│   │   ├── datasetController.js
│   │   ├── pipelineController.js
│   │   └── runController.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   ├── AlertEvent.js
│   │   ├── AlertRule.js
│   │   ├── Dataset.js
│   │   ├── JobRun.js
│   │   └── Pipeline.js
│   │
│   ├── routes/
│   │   ├── alertRoutes.js
│   │   ├── alertRuleRoutes.js
│   │   ├── datasetRoutes.js
│   │   ├── pipelineRoutes.js
│   │   └── runRoutes.js
│   │
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AlertsTable.jsx
│   │   │   ├── DashboardStats.jsx
│   │   │   ├── DatasetForm.jsx
│   │   │   ├── DatasetTable.jsx
│   │   │   ├── DetailPanel.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── PipelineForm.jsx
│   │   │   ├── PipelineTable.jsx
│   │   │   ├── RunsTable.jsx
│   │   │   └── StatCard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── .gitignore
└── README.md

Doménový model
Aplikace pracuje s těmito hlavními entitami:

Dataset
Dataset představuje evidovaný datový zdroj. V projektu se nepracuje s reálnými soubory, ale pouze s metadaty.

Dataset obsahuje například:

název,
popis,
vlastníka,
verzi schématu,
datum vytvoření a aktualizace.

Příklad:
{
  "name": "customer_transactions",
  "description": "Customer transaction dataset from e-shop",
  "owner": "analytics-team",
  "schemaVersion": 1
}

Pipeline
Pipeline představuje proces zpracování dat nad konkrétním datasetem. Pipeline vždy odkazuje na existující dataset.

Pipeline obsahuje například:

název,
popis,
odkaz na dataset,
plán spuštění,
informaci, zda je aktivní,
verzi.

Příklad:
{
  "datasetId": "dataset_id",
  "name": "daily-aggregation",
  "description": "Daily aggregation of customer transactions",
  "schedule": "0 2 * * *",
  "active": true,
  "version": 1
}

JobRun
JobRun představuje konkrétní běh pipeline.

Run může mít stav:

pending,
running,
success,
failed.

V projektu vzniká run po kliknutí na tlačítko Run pipeline. Běh je vytvořen ve stavu running. Následně může být ve frontendové aplikaci označen jako success nebo failed.

Run obsahuje například:

odkaz na pipeline,
verzi pipeline,
status,
čas spuštění,
čas dokončení,
počet zpracovaných záznamů,
chybovou zprávu.

AlertRule
AlertRule představuje pravidlo, podle kterého může vzniknout alert.

V projektu se používá zejména pravidlo typu: status_failed
To znamená, že pokud run skončí jako failed, aplikace vytvoří alert.

AlertEvent

AlertEvent je konkrétní vzniklý alert.

Vzniká například při chybovém běhu pipeline.

Alert obsahuje:

odkaz na pipeline,
odkaz na run,
odkaz na pravidlo,
zprávu,
závažnost,
stav alertu.

Business pravidla
V aplikaci jsou implementována tato pravidla:

Pipeline může vzniknout pouze nad existujícím datasetem.
Pipeline lze spustit pouze tehdy, pokud je aktivní.
Spuštění pipeline vytvoří nový JobRun ve stavu running.
Run lze změnit ze stavu running na success.
Run lze změnit ze stavu running na failed.
Hotový run nelze vrátit zpět do stavu running.
Pokud run skončí jako failed, backend automaticky vytvoří alert.
Alert se následně zobrazí ve frontendové části aplikace.

Backend API
Backend běží na adrese:

http://localhost:5000

Testovací endpoint
GET /
Vrací základní informaci, že API běží.

Příklad odpovědi:
{
  "message": "Big Data Pipeline Monitor API is running"
}

Endpointy
Datasets
POST /datasets
GET /datasets
GET /datasets/:id
POST /datasets

Vytvoří nový dataset.

Příklad body:
{
  "name": "customer_transactions",
  "description": "Customer transaction dataset from e-shop",
  "owner": "analytics-team",
  "schemaVersion": 1
}

Pipelines
POST /pipelines
GET /pipelines
GET /pipelines/:id
POST /pipelines/:id/run

POST /pipelines
Vytvoří novou pipeline nad existujícím datasetem.

Příklad body:
{
  "datasetId": "dataset_id",
  "name": "daily-aggregation",
  "description": "Daily aggregation of customer transactions",
  "schedule": "0 2 * * *",
  "active": true,
  "version": 1
}

POST /pipelines/:id/run
Spustí pipeline a vytvoří nový run ve stavu running.

Runs
GET /runs
GET /runs/:id
PATCH /runs/:id

PATCH /runs/:id
Změní stav běhu pipeline.

Příklad pro úspěšné dokončení:
{
  "status": "success",
  "recordsProcessed": 15200
}

Příklad pro chybové dokončení:
{
  "status": "failed",
  "errorMessage": "Connection timeout while processing dataset",
  "recordsProcessed": 0
}
Pokud je stav nastaven na failed, backend automaticky vytvoří alert.

Alert rules
POST /alert-rules
GET /alert-rules
GET /alert-rules/:id
PATCH /alert-rules/:id
DELETE /alert-rules/:id

POST /alert-rules
Vytvoří pravidlo pro vznik alertů.

Příklad body:
{
  "pipelineId": "pipeline_id",
  "name": "Failed run alert",
  "type": "status_failed",
  "enabled": true
}

Alerts
GET /alerts
GET /alerts/:id

Endpointy slouží pro zobrazení vzniklých alertů.

Frontend
Frontend běží na adrese:
http://localhost:5173

Frontend obsahuje:
    dashboard se statistikami,
    formulář pro vytvoření datasetu,
    formulář pro vytvoření pipeline,
    tabulku pipeline,
    akci Run pipeline,
    tabulku runů,
    akce Success a Failed u běžících runů,
    tabulku datasetů,
    tabulku alertů,
    detail pipeline,
    detail runu,
    detail alertu,
    loading, error a success stavy.

Typický scénář použití
    Uživatel vytvoří dataset.
    Uživatel vytvoří pipeline nad existujícím datasetem.
    Uživatel klikne na Run pipeline.
    Backend vytvoří nový JobRun ve stavu running.
    Uživatel může run označit jako success.
    Uživatel může spustit další run.
    Uživatel může run označit jako failed.
    Backend při failed runu automaticky vytvoří alert.
    Alert se zobrazí v tabulce alertů.
    Uživatel může kliknout na detail pipeline, runu nebo alertu.

Spuštění projektu
Požadavky

Pro spuštění projektu je potřeba mít nainstalované:
    Node.js,
    npm,
    MongoDB.

MongoDB musí běžet lokálně.

Spuštění backendu
Přejděte do složky backendu:
cd backend

Nainstalujte závislosti:
npm install

Vytvořte soubor:
.env

Do něj vložte například:
PORT=5000
MONGO_URI=mongodb://localhost:27017/big_data_pipeline_monitor

Spusťte backend:
npm run dev

Backend poběží na:
http://localhost:5000


Spuštění frontendu
V druhém terminálu přejděte do složky frontendu:
cd frontend

Nainstalujte závislosti:
npm install

Spusťte frontend:
npm run dev

Frontend poběží na:
http://localhost:5173


Poznámka k databázi
Aplikace používá lokální MongoDB. Data se ukládají do databáze definované v proměnné:
MONGO_URI

Například:
MONGO_URI=mongodb://localhost:27017/big_data_pipeline_monitor

Pokud databáze neexistuje, MongoDB ji vytvoří při prvním uložení dat.

Poznámka k simulaci
Projekt není skutečná big data platforma.

Aplikace:
    nespouští reálné Spark joby,
    neprovádí distribuované výpočty,
    nepracuje s reálnými big data soubory,
    neobsahuje skutečný cron scheduler,
    nenahrazuje Apache Airflow, Databricks Jobs ani AWS Glue.

Cílem je simulovat základní principy:
    evidence datasetů,
    evidence pipeline,
    spuštění pipeline,
    sledování běhů,
    změna stavu běhu,
    vznik alertu při chybě,
    monitoring ve webovém dashboardu.

Validace a error handling
Backend obsahuje základní validace a ošetření chyb.

Příklady:
    Dataset musí mít název a vlastníka.
    Pipeline musí mít název a existující dataset.
    Pipeline nelze vytvořit nad neexistujícím datasetem.
    Neaktivní pipeline nelze spustit.
    Neexistující run nelze upravit.
    Run nelze přepnout z finálního stavu zpět na running.
    Alert rule nelze vytvořit pro neexistující pipeline.

Komponentová struktura frontendu
Frontend je rozdělen do komponent:
    Header
    DashboardStats
    StatCard
    DatasetForm
    PipelineForm
    PipelineTable
    RunsTable
    DatasetTable
    AlertsTable
    DetailPanel

Komunikace s backendem je oddělena do souboru:
src/services/api.js

Díky tomu je frontend přehlednější a jednotlivé části UI jsou oddělené do samostatných komponent.

Ukázka hlavního toku aplikace
Dataset → Pipeline → Run → Success/Failed → Alert

Konkrétně:
    1. Dataset je vytvořen jako metadata objekt.
    2. Pipeline odkazuje na existující dataset.
    3. Kliknutí na Run pipeline vytvoří JobRun.
    4. Run je ve stavu running.
    5. Uživatel run označí jako success nebo failed.
    6. Pokud je run failed, vytvoří se AlertEvent.
    7. Alert se zobrazí v dashboardu.

Projekt byl vytvořen jako školní projekt do předmětu Softwarová architektura - 2026.
Autor: Robin Cavallo