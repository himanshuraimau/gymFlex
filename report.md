# GymFlex - Modern Fitness Management System Report

## ABSTRACT
GymFlex is a modern fitness management system designed to streamline the management of fitness activities, user profiles, workout schedules, and nutrition tracking. The system leverages a full-stack approach with a responsive frontend and a robust backend to provide a seamless user experience. This report provides an in-depth look at the design, implementation, and features of GymFlex.

The GymFlex system addresses the need for an integrated platform that can handle various aspects of fitness management. Users can create and manage their workout schedules, track their nutritional intake, and monitor their progress over time. The system's frontend is built using HTML5, CSS3, and Vanilla JavaScript, ensuring a responsive and interactive user interface. The backend, developed with Spring Boot, JPA/Hibernate, and SQLite, provides robust data management and security features, including password encryption and JWT authentication.

The conversion process includes multiple steps: the system first handles user authentication and profile management, ensuring secure access to user data. It then allows users to create and manage workout schedules, log meals, and track nutritional intake. The system also records user progress, providing visual representations of metrics like weight, body measurements, and BMI. Additionally, the implementation ensures that the data is efficiently managed and stored using structured data models and JPA/Hibernate, allowing for easy maintenance and scalability. This comprehensive approach enables GymFlex to provide a reliable and user-friendly solution for fitness enthusiasts and gym administrators alike.

## ANALYSIS
### Concepts Used:
- **Data Structures**: Efficiently manage and store data using Java classes and JPA/Hibernate.
- **Frontend Technologies**: HTML5, CSS3, Vanilla JavaScript for a responsive and interactive user interface.
- **Backend Technologies**: Spring Boot, JPA/Hibernate, RESTful APIs, SQLite, Maven for robust backend operations.

### Applications:
- **User Management**: Handles user profiles, authentication, and membership types.
- **Workout Scheduling**: Manages workout schedules with CRUD operations.
- **Nutrition Tracking**: Logs meals and tracks nutritional intake.
- **Progress Monitoring**: Records and visualizes user progress over time.

### End Users:
- **Fitness Enthusiasts**: Individuals looking to manage their fitness activities.
- **Gym Administrators**: Manage gym members, schedules, and track progress.
- **Developers**: Utilize the system for building fitness-related applications.

## IMPLEMENTATION
### Frontend
- **Technologies**: HTML5, CSS3, Vanilla JavaScript
- **Features**:
  - Responsive design with modern CSS features like Flexbox and Grid.
  - Glass morphism effects and smooth animations for an enhanced user interface.
  - Toast notifications for user feedback.
  - Custom form elements for user interactions.

#### Key Components
- **Authentication**: Handles user login and signup processes.
- **Dashboard**: Displays user-specific information and metrics.
- **Schedule Management**: Allows users to create and manage workout schedules.
- **Nutrition Tracking**: Enables users to log meals and track nutritional intake.
- **Progress Visualization**: Provides visual representations of user progress over time.

### Backend (Spring Boot)
- **Technologies**: Spring Boot, JPA/Hibernate, RESTful APIs, SQLite, Maven
- **Features**:
  - User authentication and profile management.
  - Workout schedule management with CRUD operations.
  - Nutrition tracking and meal logging.
  - Progress tracking with data visualization.
  - Security features including password encryption and JWT authentication.

#### Key Components
- **Controllers**: Handle HTTP requests and map them to service methods.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/WorkoutScheduleController.java
  @PostMapping
  public ResponseEntity<?> createSchedule(@Valid @RequestBody WorkoutSchedule schedule) {
      try {
          if (schedule.getUserId() == null) {
              return ResponseEntity.badRequest().body("UserId is required");
          }
          WorkoutSchedule saved = scheduleRepository.save(schedule);
          return ResponseEntity.ok(saved);
      } catch (Exception e) {
          logger.error("Error creating schedule: ", e);
          return ResponseEntity.internalServerError().body("Error creating schedule");
      }
  }
  ```

- **Services**: Contain business logic and interact with repositories.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/service/NutritionService.java
  public Nutrition saveNutrition(Nutrition nutrition) {
      return nutritionRepository.save(nutrition);
  }
  ```

- **Repositories**: Interface with the database to perform CRUD operations.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/repository/WorkoutScheduleRepository.java
  public interface WorkoutScheduleRepository extends JpaRepository<WorkoutSchedule, Long> {
      List<WorkoutSchedule> findByUserIdOrderByDayOfWeekAscStartTimeAsc(Long userId);
  }
  ```

- **Models**: Represent the data structures used in the application.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/model/WorkoutSchedule.java
  @Entity
  public class WorkoutSchedule {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;
      private Long userId;
      private String dayOfWeek;
      private String startTime;
      // ...existing code...
  }
  ```

- **Database**: SQLite is used as the database for storing user data, workout schedules, nutrition logs, and progress records.
  ```sql
  -- filepath: ./backend/src/main/resources/schema.sql
  CREATE TABLE IF NOT EXISTS workout_schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      day_of_week TEXT NOT NULL,
      start_time TEXT NOT NULL
  );
  ```

- **Build Tool**: Maven is used for project management and build automation.
  ```xml
  <!-- filepath: ./backend/pom.xml -->
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
      <groupId>org.xerial</groupId>
      <artifactId>sqlite-jdbc</artifactId>
      <scope>runtime</scope>
  </dependency>
  ```

### API Endpoints
#### Authentication
- **POST** `/api/auth/signup`: Register a new user.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/AuthController.java
  @PostMapping("/signup")
  public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
      User user = new User();
      user.setEmail(request.getEmail());
      user.setPassword(request.getPassword());
      user.setFullName(request.getFullName());
      user.setMembershipType(request.getMembershipType());
      
      return userService.signup(user);
  }
  ```

- **POST** `/api/auth/login`: Authenticate a user and return a JWT token.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/AuthController.java
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
      return userService.login(request.getEmail(), request.getPassword());
  }
  ```

- **POST** `/api/auth/logout`: Log out a user.

#### Workout Management
- **GET** `/api/schedule/user/{userId}`: Retrieve the workout schedule for a specific user.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/WorkoutScheduleController.java
  @GetMapping("/{userId}")
  public ResponseEntity<?> getUserSchedule(@PathVariable String userId) {
      try {
          Long userIdLong = Long.parseLong(userId);
          List<WorkoutSchedule> schedules = 
              scheduleRepository.findByUserIdOrderByDayOfWeekAscStartTimeAsc(userIdLong);
          return ResponseEntity.ok(schedules);
      } catch (NumberFormatException e) {
          return ResponseEntity.badRequest().body("Invalid user ID format");
      } catch (Exception e) {
          logger.error("Error fetching schedule: ", e);
          return ResponseEntity.internalServerError().body("Error fetching schedule");
      }
  }
  ```

- **POST** `/api/schedule/save`: Save a new workout schedule.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/WorkoutScheduleController.java
  @PostMapping("/save")
  public ResponseEntity<?> saveSchedule(@Valid @RequestBody WorkoutSchedule schedule) {
      try {
          WorkoutSchedule saved = scheduleRepository.save(schedule);
          return ResponseEntity.ok(saved);
      } catch (Exception e) {
          logger.error("Error saving schedule: ", e);
          return ResponseEntity.internalServerError().body("Error saving schedule");
      }
  }
  ```

- **PUT** `/api/schedule/{scheduleId}`: Update an existing workout schedule.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/WorkoutScheduleController.java
  @PutMapping("/{scheduleId}")
  public ResponseEntity<?> updateSchedule(@PathVariable String scheduleId,
                                          @Valid @RequestBody WorkoutSchedule schedule) {
      try {
          Long scheduleIdLong = Long.parseLong(scheduleId);
          if (!scheduleRepository.existsById(scheduleIdLong)) {
              return ResponseEntity.notFound().build();
          }
          schedule.setId(scheduleIdLong);
          WorkoutSchedule updated = scheduleRepository.save(schedule);
          return ResponseEntity.ok(updated);
      } catch (NumberFormatException e) {
          return ResponseEntity.badRequest().body("Invalid schedule ID format");
      } catch (Exception e) {
          logger.error("Error updating schedule: ", e);
          return ResponseEntity.internalServerError().body("Error updating schedule");
      }
  }
  ```

- **DELETE** `/api/schedule/{userId}/{scheduleId}`: Delete a workout schedule.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/WorkoutScheduleController.java
  @DeleteMapping("/{userId}/{scheduleId}")
  public ResponseEntity<?> deleteSchedule(@PathVariable String userId, 
                                          @PathVariable String scheduleId) {
      try {
          Long userIdLong = Long.parseLong(userId);
          Long scheduleIdLong = Long.parseLong(scheduleId);
          scheduleRepository.deleteByUserIdAndId(userIdLong, scheduleIdLong);
          return ResponseEntity.ok().build();
      } catch (NumberFormatException e) {
          return ResponseEntity.badRequest().body("Invalid ID format");
      } catch (Exception e) {
          logger.error("Error deleting schedule: ", e);
          return ResponseEntity.internalServerError().body("Error deleting schedule");
      }
  }
  ```

#### Nutrition Tracking
- **GET** `/api/nutrition/user/{userId}`: Retrieve the nutrition logs for a specific user.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/NutritionController.java
  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Nutrition>> getNutritionByUserId(@PathVariable Long userId) {
      List<Nutrition> nutritionList = nutritionService.getNutritionByUserId(userId);
      return ResponseEntity.ok(nutritionList);
  }
  ```

- **POST** `/api/nutrition/save`: Save a new nutrition log.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/NutritionController.java
  @PostMapping("/save")
  public ResponseEntity<Nutrition> saveNutrition(@RequestBody Nutrition nutrition) {
      Nutrition savedNutrition = nutritionService.saveNutrition(nutrition);
      return ResponseEntity.ok(savedNutrition);
  }
  ```

#### Progress Monitoring
- **GET** `/api/progress/user/{userId}`: Retrieve the progress records for a specific user.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/ProgressController.java
  @GetMapping("/{userId}")
  public ResponseEntity<?> getUserProgress(@PathVariable Long userId) {
      try {
          return ResponseEntity.ok(progressRepository.findByUserIdOrderByDateDesc(userId));
      } catch (Exception e) {
          return ResponseEntity.internalServerError().body("Error fetching progress");
      }
  }
  ```

- **POST** `/api/progress/save`: Save a new progress record.
  ```java
  // filepath: ./backend/src/main/java/com/gym/app/controller/ProgressController.java
  @PostMapping
  public ResponseEntity<?> addProgress(@RequestBody Progress progress) {
      try {
          Progress saved = progressRepository.save(progress);
          return ResponseEntity.ok(saved);
      } catch (Exception e) {
          return ResponseEntity.internalServerError().body("Error saving progress");
      }
  }
  ```

## RESULTS
Put snapshots of output

## CONCLUSION
The GymFlex system provides an efficient and user-friendly solution for managing fitness activities, user profiles, workout schedules, and nutrition tracking. By leveraging a full-stack approach with a responsive frontend and a robust backend, GymFlex ensures a seamless user experience. The system's modular design and use of structured data models allow for easy maintenance and scalability, making it a reliable choice for fitness enthusiasts and gym administrators alike.

The comprehensive implementation of GymFlex addresses the need for an integrated platform that can handle various aspects of fitness management. Users can securely manage their profiles, create and manage workout schedules, log meals, and track their progress over time. The system's frontend, built with modern web technologies, provides an interactive and responsive user interface, while the backend ensures robust data management and security.

