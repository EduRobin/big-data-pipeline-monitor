# Big Data Pipeline Monitor

Big Data Pipeline Monitor je školní full-stack aplikace pro evidenci, spouštění a monitoring datových pipeline.

Projekt simuluje orchestrace a monitoring podobný systémům jako Apache Airflow, Databricks Jobs nebo AWS Glue. Neprovádí skutečné big data výpočty, ale pracuje s metadaty datasetů, pipeline, běhy pipeline a alerty.

## Technologie

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

Frontend:
- React
- Vite
- Fetch API
- CSS

## Spuštění backendu

Vytvoř soubor `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/big_data_pipeline_monitor