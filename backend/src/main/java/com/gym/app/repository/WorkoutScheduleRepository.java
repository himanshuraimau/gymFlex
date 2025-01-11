package com.gym.app.repository;

import com.gym.app.model.WorkoutSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WorkoutScheduleRepository extends JpaRepository<WorkoutSchedule, Long> {
    List<WorkoutSchedule> findByUserIdOrderByDayOfWeekAscStartTimeAsc(Long userId);
    void deleteByUserIdAndId(Long userId, Long scheduleId);
}
