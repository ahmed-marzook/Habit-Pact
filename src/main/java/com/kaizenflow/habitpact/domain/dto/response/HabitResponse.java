package com.kaizenflow.habitpact.domain.dto.response;

import java.time.LocalDateTime;

import com.kaizenflow.habitpact.domain.model.habit.Frequency;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
        name = "HabitResponse",
        description = "Response object containing detailed information about a habit")
public record HabitResponse(
        @Schema(
                        description = "Unique identifier of the habit",
                        example = "550e8400-e29b-41d4-a716-446655440000")
                String id,
        @Schema(
                        description = "ID of the user who owns the habit",
                        example = "123e4567-e89b-12d3-a456-426614174000")
                String userId,
        @Schema(description = "Name of the habit", example = "Morning Meditation") String name,
        @Schema(
                        description = "Detailed description of the habit",
                        example = "10 minutes of mindfulness meditation every morning")
                String description,
        @Schema(description = "Frequency configuration of the habit", implementation = Frequency.class)
                Frequency frequency,
        @Schema(description = "Indicates if the habit is archived", example = "false") boolean archived,
        @Schema(
                        description = "Timestamp when the habit was created",
                        example = "2024-12-06T10:30:00",
                        format = "date-time")
                LocalDateTime createdAt,
        @Schema(
                        description = "Timestamp when the habit was last updated",
                        example = "2024-12-06T15:45:00",
                        format = "date-time")
                LocalDateTime updatedAt) {}
