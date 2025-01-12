# HR System

A full-stack HR system built with React (TypeScript) and NestJS, featuring employee management and attendance tracking.

## Features

### Backend (NestJS)

- **Authentication**
  - JWT-based authentication
  - Role-based access control (HR vs Normal employees)
  - Secure password hashing with bcrypt
  - Protected routes with Guards

- **Employee Management**
  - CRUD operations for employees
  - Employee groups (HR/Normal)
  - Email uniqueness validation
  - Password encryption

- **Attendance System**
  - Record daily attendance
  - View attendance history
  - Date-based filtering
  - Prevent duplicate attendance entries

- **Database**
  - PostgreSQL with TypeORM
  - Entity relationships
  - Data validation
  - Migration support

- **API Security**
  - CORS configuration
  - Input validation
  - Error handling
  - Request logging

### Frontend (React + TypeScript)

- **Authentication**
  - Login page with form validation
  - Protected routes
  - JWT token management
  - Automatic token refresh

- **Dashboard**
  - Overview statistics
  - Total employees count
  - Total attendance records
  - Clean and modern UI

- **Employee Management**
  - List all employees
  - Add new employees
  - Edit employee details
  - Delete employees
  - Form validation

- **Attendance Management**
  - Record attendance
  - View attendance history
  - Date picker integration
  - Employee selection

- **UI/UX**
  - Material-UI components
  - Responsive design
  - Error handling
  - Loading states
  - User-friendly forms

## Tech Stack

### Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- bcrypt
- class-validator
- Swagger

### Frontend
- React
- TypeScript
- Material-UI
- React Router
- Axios
- date-fns
- MUI X Date Pickers

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   JWT_SECRET=your_jwt_secret
   PORT=3001
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

The backend will be running at `http://localhost:3001`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be running at `http://localhost:3000`

## API Documentation

The API documentation is available at `http://localhost:3001/api` when the backend is running.

## Authentication

To access protected routes, you need to:
1. Create an HR user
2. Login with the HR credentials
3. Use the returned JWT token in the Authorization header

Example HR user creation:
```bash
curl -X POST http://localhost:3001/employees -H "Content-Type: application/json" -d '{"name":"HR Admin","email":"hr@example.com","password":"password123","group":"HR"}'
```

## Project Structure

### Backend
```
backend/
├── src/
│   ├── auth/           # Authentication module
│   ├── employee/       # Employee module
│   ├── attendance/     # Attendance module
│   ├── filters/        # Exception filters
│   ├── guards/         # Auth guards
│   └── main.ts         # Application entry point
```

### Frontend
```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── contexts/       # Context providers
│   ├── pages/          # Page components
│   ├── services/       # API services
│   └── App.tsx         # Root component
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 