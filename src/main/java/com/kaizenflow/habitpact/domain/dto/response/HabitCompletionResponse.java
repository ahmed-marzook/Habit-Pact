package com.kaizenflow.habitpact.domain.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.kaizenflow.habitpact.domain.enums.HabitStatus;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response object containing habit completion details")
public record HabitCompletionResponse(
        @Schema(description = "ID of the habit this completion is for") String habitId,
        @Schema(description = "ID of the user who completed the habit") String userId,
        @Schema(description = "Date when the habit was completed") LocalDate date,
        @Schema(description = "Tha habit status whether it was completed") HabitStatus status,
        @Schema(description = "Optional notes about the completion") String notes,
        @Schema(description = "When this completion was recorded") LocalDateTime createdAt) {}
