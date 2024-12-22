package com.kaizenflow.habitpact.domain.dto.request;

import java.util.List;

import com.kaizenflow.habitpact.domain.enums.HabitFrequency;

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
        @Schema(description = "Reminder configuration for the habit") ReminderRequest reminder) {
    @Schema(description = "Frequency configuration for the habit")
    public record FrequencyRequest(
            @Schema(
                            description = "Number of times to perform the habit in the given period",
                            example = "1",
                            minimum = "1",
                            maximum = "100")
                    Integer times,
            @Schema(
                            description = "Time period for the frequency",
                            example = "DAILY",
                            allowableValues = {"DAILY", "WEEKLY", "MONTHLY", "YEARLY"})
                    HabitFrequency period) {}

    @Schema(description = "Reminder configuration for the habit")
    public record ReminderRequest(
            @Schema(description = "Whether reminders are enabled for this habit", example = "true")
                    Boolean enabled,
            @Schema(
                            description = "Time of day for the reminder in HH:mm format",
                            example = "08:00",
                            pattern = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
                    String time,
            @Schema(
                            description = "Days of the week when the reminder should be sent",
                            example = "[\"MONDAY\", \"WEDNESDAY\", \"FRIDAY\"]",
                            allowableValues = {
                                "MONDAY",
                                "TUESDAY",
                                "WEDNESDAY",
                                "THURSDAY",
                                "FRIDAY",
                                "SATURDAY",
                                "SUNDAY"
                            })
                    List<String> days) {}
}
