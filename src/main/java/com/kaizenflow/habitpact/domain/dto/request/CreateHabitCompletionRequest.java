package com.kaizenflow.habitpact.domain.dto.request;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Request object for recording a habit completion")
public record CreateHabitCompletionRequest(
        @Schema(description = "Date when the habit was completed", example = "2024-12-04")
                @NotNull(message = "Date is required")
                LocalDate date,
        @Schema(description = "Whether the habit was successfully completed", example = "true")
                @NotNull(message = "Completion status is required")
                boolean completed,
        @Schema(
                        description = "Optional notes about the completion",
                        example = "Had a great meditation session today")
                String notes) {}
