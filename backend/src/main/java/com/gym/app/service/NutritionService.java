package com.gym.app.service;

import com.gym.app.model.Nutrition;
import com.gym.app.repository.NutritionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NutritionService {

    @Autowired
    private NutritionRepository nutritionRepository;

    public Nutrition saveNutrition(Nutrition nutrition) {
        return nutritionRepository.save(nutrition);
    }

    public List<Nutrition> getNutritionByUserId(Long userId) {
        return nutritionRepository.findByUserIdOrderByDateDesc(userId);
    }
}
