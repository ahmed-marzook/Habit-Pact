package com.kaizenflow.habitpact.domain.enums;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(name = "HabitStatus", description = "Represents the status of a habit for a specific day")
public enum HabitStatus {
    @Schema(description = "Habit is not yet marked as completed or failed for the day")
    PENDING("PENDING"),

    @Schema(description = "Habit was successfully completed for the day")
    COMPLETED("COMPLETED"),

    @Schema(description = "Habit was not completed for the day")
    FAILED("FAILED");

    @Schema(description = "String value of the habit status", example = "COMPLETED")
    public final String value;

    HabitStatus(String value) {
        this.value = value;
    }
}
