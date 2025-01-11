package com.gym.app.controller;

import com.gym.app.model.Nutrition;
import com.gym.app.service.NutritionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;  // Fix import for List

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/nutrition")
public class NutritionController {

    @Autowired
    private NutritionService nutritionService;

    @PostMapping("/save")
    public ResponseEntity<Nutrition> saveNutrition(@RequestBody Nutrition nutrition) {
        Nutrition savedNutrition = nutritionService.saveNutrition(nutrition);
        return ResponseEntity.ok(savedNutrition);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Nutrition>> getNutritionByUserId(@PathVariable Long userId) {
        List<Nutrition> nutritionList = nutritionService.getNutritionByUserId(userId);
        return ResponseEntity.ok(nutritionList);
    }
}
