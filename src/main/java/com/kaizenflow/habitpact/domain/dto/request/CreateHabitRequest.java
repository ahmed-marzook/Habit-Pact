package com.kaizenflow.habitpact.domain.dto.request;

import java.util.List;

import com.kaizenflow.habitpact.domain.enums.HabitFrequency;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateHabitRequest(
        @NotBlank(message = "Name is required") String name,
        String description,
        @Valid @NotNull(message = "Frequency is required") FrequencyRequest frequency,
        List<String> tags,
        @Valid ReminderRequest reminder) {
    // Compact constructor to handle defaults
    public CreateHabitRequest {
        tags = tags == null ? List.of() : tags;
        reminder = reminder == null ? new ReminderRequest(false, null, List.of()) : reminder;
    }

    public record FrequencyRequest(int times, HabitFrequency period) {}

    public record ReminderRequest(boolean enabled, String time, List<String> days) {}
}
