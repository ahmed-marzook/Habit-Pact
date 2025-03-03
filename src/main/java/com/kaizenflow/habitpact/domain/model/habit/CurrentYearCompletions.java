package com.kaizenflow.habitpact.domain.model.habit;

import java.util.HashMap;
import java.util.Map;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "CurrentYearCompletions",
        description = "Contains completion data for the current year organized by month and day")
public class CurrentYearCompletions {

    @Schema(
            description =
                    "Map of monthly habit completion data where the key is the month (1-12) and value is a map of days with completion entries",
            example = "{\"1\": {\"15\": {\"completed\": \"COMPLETED\", \"notes\": \"Morning session\"}}}")
    @Builder.Default
    private Map<Integer, Map<Integer, CompletionEntry>> monthlyData = new HashMap<>();

    // Current year stats
    //        @Builder.Default private int totalCompletedDays = 0;
    //        @Builder.Default private double completionRate = 0.0;
    //        @Builder.Default private int longestStreak = 0;

    // Monthly breakdowns for quick reporting
    //        @Builder.Default private int[] monthlyCompletions = new int[12]; // Index 0 = January

    // Structure: monthlyData.month.day = CompletionEntry
    // Example: monthlyData.get("01").get("15") gets January 15th entry
}
