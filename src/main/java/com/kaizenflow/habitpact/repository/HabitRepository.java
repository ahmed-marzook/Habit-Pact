package com.kaizenflow.habitpact.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.kaizenflow.habitpact.domain.dto.response.HabitResponse;
import com.kaizenflow.habitpact.domain.enums.HabitFrequency;
import com.kaizenflow.habitpact.domain.model.habit.Habit;

public interface HabitRepository extends MongoRepository<Habit, String> {
    // User specific queries
    List<Habit> findByUserId(String userId);

    List<HabitResponse> findByUserIdAndArchivedFalse(String userId);

    // Frequency based queries
    List<HabitResponse> findByUserIdAndFrequencyPeriod(String userId, HabitFrequency period);

    // Date range queries
    List<HabitResponse> findByUserIdAndCreatedAtBetween(
            String userId, LocalDateTime start, LocalDateTime end);

    // Streak queries
    @Query("{ 'userId': ?0, 'streak.current': { $gte: ?1 } }")
    List<HabitResponse> findByUserIdAndCurrentStreakGreaterThan(String userId, int streakValue);

    // Validation queries
    Optional<Habit> findByIdAndUserIdAndArchivedFalse(String habitId, String userId);

    // Statistics
    long countByUserIdAndArchivedFalse(String userId);

    long countByUserIdAndFrequencyPeriod(String userId, HabitFrequency period);
}
