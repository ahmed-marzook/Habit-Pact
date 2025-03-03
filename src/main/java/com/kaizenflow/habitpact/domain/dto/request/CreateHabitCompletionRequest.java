package com.kaizenflow.habitpact.domain.dto.request;

import java.time.LocalDate;

import com.kaizenflow.habitpact.domain.enums.HabitStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Request object for recording a habit completion")
public record CreateHabitCompletionRequest(
        @Schema(
                        description = "Date and time when the habit was completed",
                        example = "2023-09-15",
                        type = "string",
                        format = "date")
                @NotNull(message = "Date is required")
                LocalDate date,
        @Schema(
                        description = "Status of the habit completion",
                        example = "COMPLETED",
                        implementation = HabitStatus.class)
                @NotNull(message = "Completion status is required")
                HabitStatus habitStatus,
        @Schema(
                        description = "Optional notes about the completion",
                        example = "Had a great meditation session today")
                String notes) {}
