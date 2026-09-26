# SixthSense Disaster Prediction

## Project Overview
SixthSense Disaster Prediction is a full-stack, machine-learning-powered geographic information system (GIS) and disaster management platform. Designed with a premium futuristic aesthetic, it integrates interactive geographic risk mapping, dynamic heatmaps, and environmental machine-learning models to predict localized flood probabilities. 

## Features
*   **GIS Command Center:** Interactive map leveraging Leaflet and OpenStreetMap for spatial intelligence.
*   **Predictive Heatmaps:** Dynamic visualization of localized flood risk based on geographic coordinates.
*   **Machine Learning Integration:** Extensible machine learning pipeline for predicting flood probabilities using environmental factors.
*   **Role-Based Access Control:** Secure JWT authentication separating standard User views from the Admin management console.
*   **Model Management:** Dedicated administrative dashboard for monitoring dataset health, triggering model training, and reviewing performance metrics.
*   **Vice City Design System:** Custom CSS architecture utilizing a deep ocean midnight environment with neon pink, cyan, and purple accents.

## Technology Stack
*   **Frontend:** React 18, Vite, React Router, CSS Variables, Leaflet, React-Leaflet, Recharts, Lucide-React.
*   **Backend:** Python, FastAPI, Uvicorn, Pydantic.
*   **Machine Learning:** pandas, NumPy, scikit-learn, joblib.
*   **Database & Security:** SQLite, JWT-based REST architecture.

## Architecture
The application relies on a decoupled full-stack architecture. The React frontend handles GIS visualization and state management, communicating securely via REST APIs with the FastAPI backend. The backend manages authentication, serves predictive models, dynamically calculates geographic risk coordinates, and executes the machine-learning training pipelines.

## Folder Structure
```text
disasterManagement/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
├── backend/
│   ├── app/
│   │   ├── api/
│   │   └── main.py
│   ├── data/
│   │   └── flood_training_data.csv
│   ├── ml/
│   │   └── train_model.py
│   ├── models/
│   │   └── flood_model.joblib
│   └── requirements.txt
├── .env.example
├── .gitignore
└── README.md
