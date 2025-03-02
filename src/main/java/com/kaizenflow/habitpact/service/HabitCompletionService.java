package com.kaizenflow.habitpact.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kaizenflow.habitpact.domain.dto.request.CreateHabitCompletionRequest;
import com.kaizenflow.habitpact.domain.dto.response.HabitCompletionResponse;
import com.kaizenflow.habitpact.domain.model.habit.CompletionEntry;
import com.kaizenflow.habitpact.domain.model.habit.Habit;
import com.kaizenflow.habitpact.exception.InvalidOperationException;
import com.kaizenflow.habitpact.exception.ResourceNotFoundException;
import com.kaizenflow.habitpact.repository.HabitRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.util.ObjectUtils;

@Service
@RequiredArgsConstructor
@Transactional
public class HabitCompletionService {
    private final HabitRepository habitRepository;

    public HabitCompletionResponse recordCompletion(
            String userId, String habitId, CreateHabitCompletionRequest request) {

        // 1. Validate input parameters
        validateInputParameters(userId, habitId, request);

        // 2. Retrieve and validate habit
        Habit habit = retrieveAndValidateHabit(userId, habitId);

        // 3. Validate completion date
        LocalDate completionDate = request.date();
        validateCompletionDate(completionDate, habit.getCurrentYear());

        // 4. Update completion data
        CompletionEntry completionEntry = updateCompletionData(habit, completionDate, request);

        // 5. Save changes and return response
        habitRepository.save(habit);

        return createCompletionResponse(habit, request, completionEntry);
    }

    private void validateInputParameters(String userId, String habitId, CreateHabitCompletionRequest request) {
        if (Objects.isNull(userId) || userId.isBlank()) {
            throw new IllegalArgumentException("User ID cannot be null or empty");
        }
        if (Objects.isNull(habitId) || habitId.isBlank()) {
            throw new IllegalArgumentException("Habit ID cannot be null or empty");
        }
        Objects.requireNonNull(request, "Completion request cannot be null");
        Objects.requireNonNull(request.date(),"Completion date cannot be null" );
    }

    private Habit retrieveAndValidateHabit(String userId, String habitId) {
        return habitRepository
                .findByIdAndUserIdAndArchivedFalse(habitId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Habit", "id", habitId));
    }

    private void validateCompletionDate(LocalDate completionDate, int habitCurrentYear) {
        LocalDate today = LocalDate.now();

        if (completionDate.getYear() != habitCurrentYear) {
            throw new InvalidOperationException(
                    "Cannot complete habit: the completion date year (" + completionDate.getYear() +
                            ") does not match the habit's current year (" + habitCurrentYear + ")");
        }

        if (completionDate.isAfter(today)) {
            throw new InvalidOperationException(
                    "Cannot complete habit for a future date: " + completionDate +
                            " is after today (" + today + ")");
        }
    }

    private CompletionEntry updateCompletionData(Habit habit, LocalDate completionDate, CreateHabitCompletionRequest request) {
        int monthValue = completionDate.getMonthValue();
        int dayValue = completionDate.getDayOfMonth();

        // Get or initialize yearly data
        Map<Integer, Map<Integer, CompletionEntry>> yearMonthlyData =
                Optional.ofNullable(habit.getCurrentYearCompletions().getMonthlyData())
                        .orElseGet(HashMap::new);

        // Get or initialize monthly data
        Map<Integer, CompletionEntry> monthData =
                Optional.ofNullable(yearMonthlyData.get(monthValue))
                        .orElseGet(HashMap::new);

        // Update or create completion entry
        CompletionEntry completionEntry;
        if (monthData.containsKey(dayValue)) {
            // Update existing entry
            completionEntry = monthData.get(dayValue);
            completionEntry.setStatus(request.habitStatus());
            completionEntry.setNotes(request.notes());
            completionEntry.setUpdatedAt(LocalDateTime.now());
        } else {
            // Create new entry
            completionEntry = CompletionEntry.builder()
                    .notes(request.notes())
                    .status(request.habitStatus())
                    .build();
        }

        // Update data structures
        monthData.put(dayValue, completionEntry);
        yearMonthlyData.put(monthValue, monthData);

        // Update habit with new data structure (if using immutable object)
        habit.getCurrentYearCompletions().setMonthlyData(yearMonthlyData);

        return completionEntry;
    }

    private HabitCompletionResponse createCompletionResponse(
            Habit habit, CreateHabitCompletionRequest request, CompletionEntry completionEntry) {
        return new HabitCompletionResponse(
                habit.getId(),
                habit.getUserId(),
                request.date(),
                request.habitStatus(),
                request.notes(),
                completionEntry.getCreatedAt());
    }
}
