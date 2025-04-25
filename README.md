# Student Management System

This is a full-stack Student Management System project with:

- Backend: Express.js + MongoDB (Mongoose)
- Frontend: React.js with React Router and Axios

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```
   cd student-management-system/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Make sure MongoDB is running locally or update the connection string in `server.js` with your MongoDB URI.

4. Start the backend server:
   ```
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory:
   ```
   cd student-management-system/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## Features

- Add, view, edit, and delete students.
- React Router for navigation.
- Axios for API calls.
- Toast notifications for feedback on actions.

## Notes

- Backend API base URL is `http://localhost:5000`.
- Ensure backend is running before using the frontend.
