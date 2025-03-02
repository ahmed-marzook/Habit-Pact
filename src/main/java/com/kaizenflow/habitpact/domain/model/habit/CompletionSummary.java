package com.kaizenflow.habitpact.domain.model.habit;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompletionSummary {
    // Overall historical stats (excluding current year which is embedded)
    @Builder.Default private int historicalCompletedDays = 0;
    @Builder.Default private double historicalCompletionRate = 0.0;

    // All-time stats (historical + current year)
    @Builder.Default private int allTimeCompletedDays = 0;
    @Builder.Default private double allTimeCompletionRate = 0.0;

    // Last completion date
    private LocalDate lastCompletionDate;

    // Year summary references - year to completion document ID mapping
    // Does NOT include current year, which is embedded
    @Builder.Default private Map<Integer, String> pastYearCompletionIds = new HashMap<>();
}
