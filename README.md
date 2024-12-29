# Gym Management System

A simple web-based gym management system with user authentication.

## Project Structure
```
gym-project/
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── auth.js
│   ├── login.html
│   ├── signup.html
│   └── dashboard.html
└── backend/
    └── src/
        └── main/
            ├── java/
            │   └── com/gym/app/
            └── resources/
                └── application.properties
```

## Prerequisites

- Java JDK 17 or higher
- Maven 3.6 or higher
- Node.js (for running a local development server)

## Running the Application

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. You can use any simple HTTP server to serve the frontend files. For example, using Python:
   ```bash
   # Python 3.x
   python -m http.server 3000
   ```
   Or using Node.js's http-server:
   ```bash
   # Install http-server globally
   npm install -g http-server
   
   # Run the server
   http-server -p 3000
   ```

The frontend will be accessible at `http://localhost:3000`

## Features

- User registration with membership type selection
- User authentication (login/logout)
- Simple dashboard interface
- Responsive design

## API Endpoints

- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Authenticate user

## Development

### Backend Development
- The application uses H2 in-memory database
- Access H2 console at `http://localhost:8080/h2-console`
- Database credentials are in `application.properties`

### Frontend Development
- HTML/CSS/JavaScript
- No build process required
- Uses fetch API for backend communication

## Security Notes

This is a basic implementation and should not be used in production without:
- Proper password hashing
- JWT or session-based authentication
- HTTPS implementation
- Input validation and sanitization
- Production-grade database
