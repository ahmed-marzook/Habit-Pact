package com.kaizenflow.habitpact.domain.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response object containing habit completion details")
public record HabitCompletionResponse(
        @Schema(description = "Unique identifier for the completion record") String id,
        @Schema(description = "ID of the habit this completion is for") String habitId,
        @Schema(description = "ID of the user who completed the habit") String userId,
        @Schema(description = "Date when the habit was completed") LocalDate date,
        @Schema(description = "Whether the habit was successfully completed") boolean completed,
        @Schema(description = "Optional notes about the completion") String notes,
        @Schema(description = "When this completion was recorded") LocalDateTime createdAt) {}
