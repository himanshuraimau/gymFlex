# GymFlex - Modern Fitness Management System

A comprehensive fitness management system with modern UI and full-stack capabilities.

## 🎨 Design System & UI Components

### Color Palette
```css
Primary: #4f46e5 (Indigo)
Secondary: #7c3aed (Purple)
Accent: #3b82f6 (Blue)
Success: #4CAF50 (Green)
Danger: #dc3545 (Red)
```

### UI Features
- Glass morphism effects
- Gradient backgrounds
- Smooth animations
- Toast notifications
- Responsive layouts
- Custom form elements

## 🚀 Core Features

### User Management
- Authentication system
- Profile management
- Membership tracking

### Workout Features
- Weekly schedule planner
- Workout type categorization
- Time slot management
- Progress tracking

### Nutrition Management
- Meal logging system
- Calorie tracking
- Macro nutrients monitoring
- Meal type categorization

### Progress Tracking
- Weight tracking
- Body measurements
- BMI calculator
- Progress visualization

## 🛠️ Technical Stack

### Frontend
- HTML5/CSS3
- Modern CSS Features:
  - CSS Variables
  - Flexbox & Grid
  - Animations
  - Glass morphism
- Vanilla JavaScript
- Responsive Design

### Backend (Spring Boot)
- Models:
  - User
  - Progress
  - Nutrition
  - Workout Schedule
- RESTful APIs
- JPA/Hibernate
- Security implementation

## 📦 Project Structure
```
gymflex/
├── frontend/
│   ├── css/
│   │   ├── style.css      # Core styles
│   │   ├── home.css       # Landing page
│   │   ├── dashboard.css  # Dashboard
│   │   ├── schedule.css   # Schedule
│   │   └── toast.css      # Notifications
│   ├── js/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   └── schedule.js
│   └── *.html
└── backend/
    └── src/main/java/com/gym/app/
        ├── controller/
        ├── model/
        ├── repository/
        └── service/
```

## 🚀 Setup & Installation

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
# Using Python SimpleHTTPServer
python -m http.server 3000
# OR using Node http-server
npx http-server -p 3000
```

## 🔒 Security Features
- Password encryption
- JWT authentication
- CORS configuration
- Input validation
- XSS protection

## 🌐 API Endpoints

### Authentication
- POST `/api/auth/signup`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### Workout Management
- GET `/api/schedule/user/{userId}`
- POST `/api/schedule/save`

### Nutrition Tracking
- GET `/api/nutrition/user/{userId}`
- POST `/api/nutrition/save`

### Progress Monitoring
- GET `/api/progress/user/{userId}`
- POST `/api/progress/save`

## 💻 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📝 License
MIT License - See [LICENSE](LICENSE) for details
