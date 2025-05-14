Medical Scribe Project
Setup Instructions
Backend

Navigate to the backend directory:cd backend


Install dependencies:npm install


Start the backend server:npm start

The server will run on http://localhost:5000.

Frontend

Navigate to the frontend directory:cd frontend


Open public/index.html in a browser to run the React app. The app will fetch data from the backend running on http://localhost:5000.

Notes

Ensure the backend server is running before accessing the frontend.
The app uses an in-memory data store for simplicity. In a production environment, replace it with a database like MongoDB or PostgreSQL.

