package com.gym.app.service;

import com.gym.app.model.User;
import com.gym.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;

@Service
public class UserService {
    
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    
    @Autowired
    private UserRepository userRepository;
    
    public ResponseEntity<?> signup(User user) {
        try {
            if (user == null || user.getEmail() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body("Invalid user data");
            }

            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                logger.warn("Signup attempt with existing email: {}", user.getEmail());
                return ResponseEntity.badRequest().body("Email already exists");
            }
            
            User savedUser = userRepository.save(user);
            logger.info("New user registered: {}", user.getEmail());
            
            return ResponseEntity.ok()
                .body(Map.of(
                    "message", "Registration successful",
                    "user", savedUser
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

            return userRepository.findByEmail(email)
                .map(user -> {
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
                })
                .orElseGet(() -> {
                    logger.warn("Login attempt with non-existent email: {}", email);
                    return ResponseEntity.badRequest().body("Invalid credentials");
                });
        } catch (Exception e) {
            logger.error("Error during login", e);
            return ResponseEntity.internalServerError()
                .body("An error occurred during login");
        }
    }
}