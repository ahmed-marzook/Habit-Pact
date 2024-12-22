package com.kaizenflow.habitpact.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Summary of habit completion statistics")
public record HabitCompletionSummary(
        @Schema(description = "Total number of times the habit was completed") long totalCompletions,
        @Schema(description = "Number of successful completions") long successfulCompletions,
        @Schema(description = "Success rate as a percentage") double successRate,
        @Schema(description = "Current streak of successful completions") int currentStreak,
        @Schema(description = "Longest streak achieved") int longestStreak) {}
