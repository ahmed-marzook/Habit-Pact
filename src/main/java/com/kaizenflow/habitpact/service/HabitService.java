package com.kaizenflow.habitpact.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kaizenflow.habitpact.domain.dto.request.CreateHabitRequest;
import com.kaizenflow.habitpact.domain.dto.request.UpdateHabitRequest;
import com.kaizenflow.habitpact.domain.dto.response.HabitResponse;
import com.kaizenflow.habitpact.domain.model.Frequency;
import com.kaizenflow.habitpact.domain.model.Habit;
import com.kaizenflow.habitpact.domain.model.Reminder;
import com.kaizenflow.habitpact.domain.model.Streak;
import com.kaizenflow.habitpact.exception.ResourceNotFoundException;
import com.kaizenflow.habitpact.mappers.HabitMapper;
import com.kaizenflow.habitpact.repository.HabitRepository;

@Service
@Transactional
public class HabitService {
    private final HabitRepository habitRepository;

    private final HabitMapper habitMapper;

    public HabitService(HabitRepository habitRepository, HabitMapper habitMapper) {
        this.habitRepository = habitRepository;
        this.habitMapper = habitMapper;
    }

    public HabitResponse createHabit(String userId, CreateHabitRequest request) {
        Frequency frequency =
                Frequency.builder()
                        .times(request.frequency().times())
                        .period(request.frequency().period())
                        .build();

        Reminder reminder =
                Reminder.builder()
                        .enabled(request.reminder().enabled())
                        .time(request.reminder().time())
                        .days(request.reminder().days())
                        .build();

        Streak streak = Streak.builder().current(0).longest(0).build();

        Habit habit =
                Habit.builder()
                        .userId(userId)
                        .name(request.name())
                        .description(request.description())
                        .frequency(frequency)
                        .tags(request.tags())
                        .reminder(reminder)
                        .streak(streak)
                        .build();

        return habitMapper.habitToHabitResponse(habitRepository.save(habit));
    }

    public HabitResponse updateHabit(String userId, String habitId, CreateHabitRequest request) {
        Habit habit =
                habitRepository
                        .findByIdAndUserIdAndArchivedFalse(habitId, userId)
                        .orElseThrow(
                                () -> new ResourceNotFoundException("Habit not found", "habitId", habitId));

        Frequency frequency =
                Frequency.builder()
                        .times(request.frequency().times())
                        .period(request.frequency().period())
                        .build();

        Reminder reminder =
                Reminder.builder()
                        .enabled(request.reminder().enabled())
                        .time(request.reminder().time())
                        .days(request.reminder().days())
                        .build();

        habit.setName(request.name());
        habit.setDescription(request.description());
        habit.setFrequency(frequency);
        habit.setTags(request.tags());
        habit.setReminder(reminder);

        return habitMapper.habitToHabitResponse(habitRepository.save(habit));
    }

    public HabitResponse patchHabit(String userId, String habitId, UpdateHabitRequest request) {
        Habit habit =
                habitRepository
                        .findByIdAndUserIdAndArchivedFalse(habitId, userId)
                        .orElseThrow(
                                () -> new ResourceNotFoundException("Habit not found", "habitId", habitId));

        if (request.name() != null) {
            habit.setName(request.name());
        }

        if (request.description() != null) {
            habit.setDescription(request.description());
        }

        if (request.tags() != null) {
            habit.setTags(request.tags());
        }

        // Update frequency if provided
        if (request.frequency() != null) {
            Frequency currentFreq = habit.getFrequency();
            Frequency updatedFreq =
                    Frequency.builder()
                            .times(
                                    request.frequency().times() != null
                                            ? request.frequency().times()
                                            : currentFreq.getTimes())
                            .period(
                                    request.frequency().period() != null
                                            ? request.frequency().period()
                                            : currentFreq.getPeriod())
                            .build();
            habit.setFrequency(updatedFreq);
        }

        // Update reminder if provided
        if (request.reminder() != null) {
            Reminder currentReminder = habit.getReminder();
            Reminder updatedReminder =
                    Reminder.builder()
                            .enabled(request.reminder().enabled())
                            .time(
                                    request.reminder().time() != null
                                            ? request.reminder().time()
                                            : currentReminder.getTime())
                            .days(
                                    request.reminder().days() != null
                                            ? request.reminder().days()
                                            : currentReminder.getDays())
                            .build();
            habit.setReminder(updatedReminder);
        }

        return habitMapper.habitToHabitResponse(habitRepository.save(habit));
    }

    public void deleteHabit(String userId, String habitId) {
        Habit habit =
                habitRepository
                        .findByIdAndUserIdAndArchivedFalse(habitId, userId)
                        .orElseThrow(
                                () -> new ResourceNotFoundException("Habit not found", "habitId", habitId));

        habit.setArchived(true);
        habitRepository.save(habit);
    }

    public HabitResponse getHabit(String userId, String habitId) {
        return habitMapper.habitToHabitResponse(
                habitRepository
                        .findByIdAndUserIdAndArchivedFalse(habitId, userId)
                        .orElseThrow(
                                () -> new ResourceNotFoundException("Habit not found", "habitId", habitId)));
    }

    public List<HabitResponse> getUserHabits(String userId) {
        return habitRepository.findByUserIdAndArchivedFalse(userId);
    }
}
