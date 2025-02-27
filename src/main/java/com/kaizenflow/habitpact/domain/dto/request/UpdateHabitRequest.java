package com.kaizenflow.habitpact.domain.dto.request;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request object for updating an existing habit")
public record UpdateHabitRequest(
        @Schema(
                        description = "New name of the habit",
                        example = "Morning Meditation",
                        minLength = 1,
                        maxLength = 100)
                String name,
        @Schema(
                        description = "New description of the habit",
                        example = "10 minutes of mindfulness meditation every morning",
                        maxLength = 500)
                String description,
        @Schema(description = "Frequency configuration for the habit") FrequencyRequest frequency,
        @Schema(
                        description = "List of tags to categorize the habit",
                        example = "[\"wellness\", \"mindfulness\", \"morning-routine\"]")
                List<String> tags,
        @Schema(description = "Reminder configuration for the habit") ReminderRequest reminder) {}
