package com.gym.app.service;

import com.gym.app.model.User;
import com.gym.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public ResponseEntity<?> signup(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
    
    public ResponseEntity<?> login(String email, String password) {
        User user = userRepository.findByEmail(email)
            .orElse(null);
            
        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
        
        return ResponseEntity.ok(user);
    }
}