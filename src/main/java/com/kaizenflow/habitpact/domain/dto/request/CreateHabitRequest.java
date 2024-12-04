package com.kaizenflow.habitpact.domain.dto.request;

import java.util.List;

import com.kaizenflow.habitpact.domain.enums.HabitFrequency;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Request object for creating a new habit")
public record CreateHabitRequest(
        @Schema(description = "Name of the habit", example = "Morning Meditation")
                @NotBlank(message = "Name is required")
                String name,
        @Schema(
                        description = "Description of the habit",
                        example = "10 minutes of mindfulness meditation")
                String description,
        @Schema(description = "Frequency details of the habit")
                @Valid
                @NotNull(message = "Frequency is required")
                FrequencyRequest frequency,
        @Schema(
                        description = "Tags to categorize the habit",
                        example = "[\"wellness\", \"mindfulness\"]")
                List<String> tags,
        @Schema(description = "Reminder settings for the habit") @Valid ReminderRequest reminder) {
    // Compact constructor to handle defaults
    public CreateHabitRequest {
        tags = tags == null ? List.of() : tags;
        reminder = reminder == null ? new ReminderRequest(false, null, List.of()) : reminder;
    }

    @Schema(description = "Frequency configuration for the habit")
    public record FrequencyRequest(
            @Schema(description = "Number of times to perform the habit", example = "1", minimum = "1")
                    int times,
            @Schema(description = "Period for the frequency (DAILY, WEEKLY, MONTHLY)", example = "DAILY")
                    HabitFrequency period) {}

    @Schema(description = "Reminder configuration for the habit")
    public record ReminderRequest(
            @Schema(description = "Whether the reminder is enabled", example = "true") boolean enabled,
            @Schema(description = "Time for the reminder in HH:mm format", example = "08:00") String time,
            @Schema(
                            description = "Days of the week for the reminder",
                            example = "[\"MONDAY\", \"WEDNESDAY\", \"FRIDAY\"]")
                    List<String> days) {}
}
