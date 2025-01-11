package com.gym.app.controller;

import com.gym.app.model.WorkoutSchedule;
import com.gym.app.repository.WorkoutScheduleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class WorkoutScheduleController {
    
    private static final Logger logger = LoggerFactory.getLogger(WorkoutScheduleController.class);
    
    @Autowired
    private WorkoutScheduleRepository scheduleRepository;

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
}
