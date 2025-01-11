package com.gym.app.repository;

import com.gym.app.model.Nutrition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NutritionRepository extends JpaRepository<Nutrition, Long> {
    List<Nutrition> findByUserIdOrderByDateDesc(Long userId);
}
