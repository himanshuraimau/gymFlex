package com.gym.app.service;

import com.gym.app.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {
    
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    
    // Using ConcurrentHashMap for thread safety
    private final Map<String, User> users = new ConcurrentHashMap<>();
    private Long currentId = 1L;
    
    public ResponseEntity<?> signup(User user) {
        try {
            if (user == null || user.getEmail() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body("Invalid user data");
            }

            if (users.containsKey(user.getEmail())) {
                logger.warn("Signup attempt with existing email: {}", user.getEmail());
                return ResponseEntity.badRequest().body("Email already exists");
            }
            
            synchronized (this) {
                user.setId(currentId++);
            }
            users.put(user.getEmail(), user);
            
            logger.info("New user registered: {}", user.getEmail());
            return ResponseEntity.ok()
                .body(Map.of(
                    "message", "Registration successful",
                    "user", user
                ));
        } catch (Exception e) {
            logger.error("Error during signup", e);
            return ResponseEntity.internalServerError()
                .body("An error occurred during registration");
        }
    }
    
    public ResponseEntity<?> login(String email, String password) {
        try {
            if (email == null || password == null) {
                return ResponseEntity.badRequest().body("Email and password are required");
            }

            User user = users.get(email);
            
            if (user == null) {
                logger.warn("Login attempt with non-existent email: {}", email);
                return ResponseEntity.badRequest().body("Invalid credentials");
            }
            
            if (!user.getPassword().equals(password)) {
                logger.warn("Invalid password attempt for email: {}", email);
                return ResponseEntity.badRequest().body("Invalid credentials");
            }
            
            logger.info("Successful login for user: {}", email);
            return ResponseEntity.ok()
                .body(Map.of(
                    "message", "Login successful",
                    "user", user
                ));
        } catch (Exception e) {
            logger.error("Error during login", e);
            return ResponseEntity.internalServerError()
                .body("An error occurred during login");
        }
    }
    
    // Helper method to get all users (for testing)
    public Map<String, User> getAllUsers() {
        return new HashMap<>(users);
    }
}