package com.kaizenflow.habitpact.domain.dto;

import java.time.LocalDate;
import java.util.List;

import com.kaizenflow.habitpact.domain.dto.response.HabitCompletionResponse;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Habit completions within a specific time period")
public record HabitCompletionPeriod(
        @Schema(description = "Start date of the period") LocalDate startDate,
        @Schema(description = "End date of the period") LocalDate endDate,
        @Schema(description = "List of completions within this period")
                List<HabitCompletionResponse> completions,
        @Schema(description = "Summary statistics for this period") HabitCompletionSummary summary) {}
