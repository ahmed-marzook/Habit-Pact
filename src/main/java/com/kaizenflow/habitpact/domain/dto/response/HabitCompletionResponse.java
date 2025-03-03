package com.kaizenflow.habitpact.domain.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.kaizenflow.habitpact.domain.enums.HabitStatus;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response object containing habit completion details")
public record HabitCompletionResponse(
        @Schema(description = "ID of the habit this completion is for", example = "hab_12345abcde")
                String habitId,
        @Schema(description = "ID of the user who completed the habit", example = "usr_67890fghij")
                String userId,
        @Schema(
                        description = "Date and time when the habit was completed",
                        example = "2023-09-15",
                        type = "string",
                        format = "date")
                LocalDate date,
        @Schema(
                        description = "The status of the habit completion",
                        example = "COMPLETED",
                        allowableValues = {"PENDING", "COMPLETED", "FAILED"})
                HabitStatus status,
        @Schema(
                        description = "Optional notes about the completion",
                        example = "Completed with extra effort today")
                String notes,
        @Schema(
                        description = "When this completion was recorded",
                        example = "2023-09-15T14:30:45",
                        type = "string",
                        format = "date-time")
                LocalDateTime createdAt,
        @Schema(
                        description =
                                "Indicates whether this is a deletion response (true) or a creation/update response (false/null)",
                        example = "true",
                        defaultValue = "false")
                Boolean deleted) {}
