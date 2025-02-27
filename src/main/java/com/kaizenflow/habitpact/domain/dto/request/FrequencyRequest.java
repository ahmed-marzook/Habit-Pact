package com.kaizenflow.habitpact.domain.dto.request;

import com.kaizenflow.habitpact.domain.enums.HabitFrequency;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Frequency configuration for the habit")
public record FrequencyRequest(
        @Schema(
                        description = "Number of times to perform the habit in the given period",
                        example = "1",
                        minimum = "1",
                        maximum = "100")
                Integer times,
        @Schema(
                        description = "Time period for the frequency",
                        example = "DAILY",
                        allowableValues = {"DAILY", "WEEKLY", "MONTHLY", "YEARLY"})
                HabitFrequency period) {}
