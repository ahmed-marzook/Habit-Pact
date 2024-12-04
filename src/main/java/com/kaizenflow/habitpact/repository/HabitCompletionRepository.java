package com.kaizenflow.habitpact.repository;

import com.kaizenflow.habitpact.domain.model.HabitCompletion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HabitCompletionRepository extends MongoRepository<HabitCompletion, String> {
    // Find completions for a specific habit
    List<HabitCompletion> findByHabitIdOrderByDateDesc(String habitId);

    // Find all completions for a user
    List<HabitCompletion> findByUserIdOrderByDateDesc(String userId);

    // Find completion for a specific habit on a specific date
    Optional<HabitCompletion> findByHabitIdAndDate(String habitId, LocalDate date);

    // Find completions within a date range for a habit
    List<HabitCompletion> findByHabitIdAndDateBetweenOrderByDateDesc(
            String habitId,
            LocalDate startDate,
            LocalDate endDate
    );

    // Find all completions for a user within a date range
    List<HabitCompletion> findByUserIdAndDateBetweenOrderByDateDesc(
            String userId,
            LocalDate startDate,
            LocalDate endDate
    );

    // Check if a habit was completed on a specific date
    boolean existsByHabitIdAndDateAndCompleted(String habitId, LocalDate date, boolean completed);

    // Count successful completions for a habit
    long countByHabitIdAndCompleted(String habitId, boolean completed);

    // Count successful completions within a date range
    long countByHabitIdAndDateBetweenAndCompleted(
            String habitId,
            LocalDate startDate,
            LocalDate endDate,
            boolean completed
    );

    // Custom query to find the latest completion for a habit
    @Query(sort = "{ date: -1 }")
    Optional<HabitCompletion> findFirstByHabitId(String habitId);

    // Find all completions for multiple habits
    List<HabitCompletion> findByHabitIdInOrderByDateDesc(List<String> habitIds);

    // Delete all completions for a habit (used when deleting a habit)
    void deleteByHabitId(String habitId);
}
