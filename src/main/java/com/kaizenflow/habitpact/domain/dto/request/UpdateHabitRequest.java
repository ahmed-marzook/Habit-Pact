package com.kaizenflow.habitpact.domain.dto.request;

import java.util.List;

import com.kaizenflow.habitpact.domain.enums.HabitFrequency;

public record UpdateHabitRequest(
        String name,
        String description,
        FrequencyRequest frequency,
        List<String> tags,
        ReminderRequest reminder) {
    public record FrequencyRequest(Integer times, HabitFrequency period) {}

    public record ReminderRequest(Boolean enabled, String time, List<String> days) {}
}
