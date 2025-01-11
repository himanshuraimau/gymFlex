package com.gym.app.controller;

import com.gym.app.model.Progress;
import com.gym.app.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    @Autowired
    private ProgressRepository progressRepository;

    @PostMapping
    public ResponseEntity<?> addProgress(@RequestBody Progress progress) {
        try {
            Progress saved = progressRepository.save(progress);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error saving progress");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProgress(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(progressRepository.findByUserIdOrderByDateDesc(userId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching progress");
        }
    }
}
