# Customer Relationship Management (CRM) - Setup Guide

This guide will help you set up and run the CRM project locally.

## Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

## Project Structure
```
Customer-Relationship-Management/
├── backend/      # Express.js API
├── frontend/     # React.js client
└── DB_SCHEMA.md  # Database schema documentation
```

---

## 1. Clone the Repository
```
git clone <repo-url>
cd Customer-Relationship-Management
```

## 2. Backend Setup
```
cd backend
npm install
```

### Configure Environment Variables
Create a `.env` file in the `backend` folder:
```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

### Start the Backend Server
```
npm start
```
The backend will run on [http://localhost:5000](http://localhost:5000)

---

## 3. Frontend Setup
```
cd ../frontend
npm install
```

### Start the Frontend
```
npm start
```
The frontend will run on [http://localhost:3000](http://localhost:3000)

---

## 4. Usage
- Register a new user or log in.
- Manage customers and leads from the dashboard.

---

## 5. Troubleshooting
- **CORS errors:** Ensure both servers are running and CORS is configured in `backend/server.js`.
- **MongoDB connection errors:** Check your `MONGO_URI` in `.env`.
- **Port conflicts:** Make sure ports 5000 (backend) and 3000 (frontend) are free.

---

## 6. Customization
- Update database schema in `DB_SCHEMA.md` as needed.
- Modify frontend and backend code for additional features.

---

## 7. License
This project is for educational/demo purposes.
