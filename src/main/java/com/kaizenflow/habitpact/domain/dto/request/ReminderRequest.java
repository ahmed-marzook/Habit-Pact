package com.kaizenflow.habitpact.domain.dto.request;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Reminder configuration for the habit")
public record ReminderRequest(
        @Schema(description = "Whether the reminder is enabled", example = "true") boolean enabled,
        @Schema(description = "Time for the reminder in HH:mm format", example = "08:00") String time,
        @Schema(
                        description = "Days of the week for the reminder",
                        example = "[\"MONDAY\", \"WEDNESDAY\", \"FRIDAY\"]")
                List<String> days) {}
