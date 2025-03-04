package com.kaizenflow.habitpact.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kaizenflow.habitpact.domain.dto.request.CreateHabitRequest;
import com.kaizenflow.habitpact.domain.dto.response.HabitResponse;
import com.kaizenflow.habitpact.domain.model.habit.CurrentYearCompletions;
import com.kaizenflow.habitpact.domain.model.habit.Frequency;
import com.kaizenflow.habitpact.domain.model.habit.Habit;
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

        Habit habit =
                Habit.builder()
                        .userId(userId)
                        .name(request.name())
                        .description(request.description())
                        .frequency(frequency)
                        .currentYear(LocalDate.now().getYear())
                        .currentYearCompletions(new CurrentYearCompletions())
                        .build();
        return habitMapper.habitToHabitResponse(habitRepository.save(habit));
    }

    public List<HabitResponse> getUserHabits(String userId) {
        return habitRepository.findByUserIdAndArchivedFalse(userId);
    }
}
