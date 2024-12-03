package com.kaizenflow.habitpact.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.kaizenflow.habitpact.domain.enums.HabitFrequency;
import com.kaizenflow.habitpact.domain.model.Habit;

public interface HabitRepository extends MongoRepository<Habit, String> {
    // User specific queries
    List<Habit> findByUserId(String userId);

    List<Habit> findByUserIdAndArchivedFalse(String userId);

    // Frequency based queries
    List<Habit> findByUserIdAndFrequencyPeriod(String userId, HabitFrequency period);

    // Tag based queries
    List<Habit> findByUserIdAndTagsContaining(String userId, String tag);

    // Date range queries
    List<Habit> findByUserIdAndCreatedAtBetween(
            String userId, LocalDateTime start, LocalDateTime end);

    // Streak queries
    @Query("{ 'userId': ?0, 'streak.current': { $gte: ?1 } }")
    List<Habit> findByUserIdAndCurrentStreakGreaterThan(String userId, int streakValue);

    // Validation queries
    Optional<Habit> findByIdAndUserId(String habitId, String userId);

    // Reminder queries
    @Query("{ 'userId': ?0, 'reminder.enabled': true }")
    List<Habit> findHabitsWithReminders(String userId);

    // Multi-tag queries
    @Query("{ 'userId': ?0, 'tags': { $all: ?1 } }")
    List<Habit> findByUserIdAndTags(String userId, List<String> tags);

    // Statistics
    long countByUserIdAndArchivedFalse(String userId);

    long countByUserIdAndFrequencyPeriod(String userId, HabitFrequency period);
}
