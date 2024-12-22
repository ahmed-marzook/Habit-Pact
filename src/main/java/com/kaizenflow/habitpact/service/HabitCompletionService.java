package com.kaizenflow.habitpact.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kaizenflow.habitpact.domain.dto.request.CreateHabitCompletionRequest;
import com.kaizenflow.habitpact.domain.dto.response.HabitCompletionResponse;
import com.kaizenflow.habitpact.domain.model.HabitCompletion;
import com.kaizenflow.habitpact.exception.InvalidOperationException;
import com.kaizenflow.habitpact.exception.ResourceNotFoundException;
import com.kaizenflow.habitpact.mappers.HabitCompletionMapper;
import com.kaizenflow.habitpact.repository.HabitCompletionRepository;
import com.kaizenflow.habitpact.repository.HabitRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class HabitCompletionService {
    private final HabitCompletionRepository completionRepository;
    private final HabitRepository habitRepository;
    private final HabitCompletionMapper habitCompletionMapper;

    public HabitCompletionResponse recordCompletion(
            String userId, String habitId, CreateHabitCompletionRequest request) {
        // Verify habit exists and belongs to user
        habitRepository
                .findByIdAndUserIdAndArchivedFalse(habitId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Habit", "id", habitId));

        // Check if completion already exists for this date
        completionRepository
                .findByHabitIdAndDate(habitId, request.date())
                .ifPresent(
                        existing -> {
                            throw new InvalidOperationException("Completion already exists for this date");
                        });

        // Create new completion
        HabitCompletion completion =
                HabitCompletion.builder()
                        .habitId(habitId)
                        .userId(userId)
                        .date(request.date())
                        .completed(request.completed())
                        .notes(request.notes())
                        .build();

        completion = completionRepository.save(completion);
        return habitCompletionMapper.habitCompletionToHabitCompletionResponse(completion);
    }

    public HabitCompletionResponse updateCompletion(
            String userId, String habitId, String completionId, CreateHabitCompletionRequest request) {

        HabitCompletion completion =
                completionRepository
                        .findById(completionId)
                        .orElseThrow(() -> new ResourceNotFoundException("Completion", "id", completionId));

        // Verify ownership
        if (!completion.getUserId().equals(userId) || !completion.getHabitId().equals(habitId)) {
            throw new InvalidOperationException("Completion does not belong to user or habit");
        }

        completion.setCompleted(request.completed());
        completion.setNotes(request.notes());

        completion = completionRepository.save(completion);
        return habitCompletionMapper.habitCompletionToHabitCompletionResponse(completion);
    }

    @Transactional(readOnly = true)
    public List<HabitCompletionResponse> getCompletions(
            String userId, String habitId, LocalDate startDate, LocalDate endDate) {
        return completionRepository
                .findByHabitIdAndDateBetweenOrderByDateDesc(habitId, startDate, endDate)
                .stream()
                .filter(completion -> completion.getUserId().equals(userId))
                .map(habitCompletionMapper::habitCompletionToHabitCompletionResponse)
                .toList();
    }

    //    @Transactional(readOnly = true)
    //    public HabitCompletionSummary getCompletionSummary(String userId, String habitId, LocalDate
    // startDate, LocalDate endDate) {
    //        long total = completionRepository.countByHabitIdAndDateBetween(habitId, startDate,
    // endDate);
    //        long successful = completionRepository.countByHabitIdAndDateBetweenAndCompleted(habitId,
    // startDate, endDate, true);
    //        double successRate = total > 0 ? (double) successful / total * 100 : 0;
    //
    //        return new HabitCompletionSummary(
    //                total,
    //                successful,
    //                successRate,
    //                calculateCurrentStreak(habitId),
    //                calculateLongestStreak(habitId)
    //        );
    //    }

    private int calculateCurrentStreak(String habitId) {
        // Implementation of streak calculation logic
        return 0; // Placeholder
    }

    private int calculateLongestStreak(String habitId) {
        // Implementation of longest streak calculation logic
        return 0; // Placeholder
    }

    public void deleteCompletion(String userId, String habitId, String completionId) {
        HabitCompletion completion =
                completionRepository
                        .findById(completionId)
                        .orElseThrow(() -> new ResourceNotFoundException("Completion", "id", completionId));

        if (!completion.getUserId().equals(userId) || !completion.getHabitId().equals(habitId)) {
            throw new InvalidOperationException("Completion does not belong to user or habit");
        }

        completionRepository.delete(completion);
    }
}
