package com.kaizenflow.habitpact.domain.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Request object for creating a new habit")
public record CreateHabitRequest(
        @Schema(description = "Name of the habit", example = "Morning Meditation")
                @NotBlank(message = "Name is required")
                String name,
        @Schema(
                        description = "Description of the habit",
                        example = "10 minutes of mindfulness meditation")
                String description,
        @Schema(description = "Frequency details of the habit")
                @Valid
                @NotNull(message = "Frequency is required")
                FrequencyRequest frequency) {
    // Compact constructor to handle defaults
    public CreateHabitRequest {}
}
