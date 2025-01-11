package com.gym.app.controller;

import com.gym.app.model.Workout;
import com.gym.app.repository.WorkoutRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "*")
public class WorkoutController {
    
    private static final Logger logger = LoggerFactory.getLogger(WorkoutController.class);
    
    @Autowired
    private WorkoutRepository workoutRepository;
    
    @PostMapping
    public ResponseEntity<?> createWorkout(@RequestBody Workout workout) {
        try {
            logger.debug("Received workout data: {}", workout);
            
            if (workout.getUserId() == null) {
                return ResponseEntity.badRequest().body("UserId is required");
            }
            
            Workout savedWorkout = workoutRepository.save(workout);
            logger.info("Workout saved successfully for user: {}", workout.getUserId());
            return ResponseEntity.ok(savedWorkout);
        } catch (Exception e) {
            logger.error("Error saving workout: ", e);
            return ResponseEntity.internalServerError().body("Error saving workout");
        }
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserWorkouts(@PathVariable String userId) {
        try {
            Long userIdLong = Long.parseLong(userId);
            List<Workout> workouts = workoutRepository.findByUserIdOrderByDateDesc(userIdLong);
            return ResponseEntity.ok(workouts);
        } catch (NumberFormatException e) {
            logger.error("Invalid user ID format: {}", userId);
            return ResponseEntity.badRequest().body("Invalid user ID format");
        } catch (Exception e) {
            logger.error("Error fetching workouts for user {}: {}", userId, e.getMessage());
            return ResponseEntity.internalServerError().body("Error fetching workouts");
        }
    }
}
