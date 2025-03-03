package com.kaizenflow.habitpact.domain.model.habit;

import java.time.LocalDateTime;

import com.kaizenflow.habitpact.domain.enums.HabitStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a single day's habit completion status and notes. Used within the habit tracking
 * system to record whether a habit was completed on a specific day and any additional notes.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "CompletionEntry",
        description = "Represents a single day's habit completion status and notes")
public class CompletionEntry {
    /** Whether the habit was completed on this day */
    @Schema(
            description = "Status of the habit for this day",
            example = "COMPLETED",
            implementation = HabitStatus.class)
    private HabitStatus status;

    /** Optional notes or comments about the habit completion */
    @Schema(
            description = "Optional notes or comments about the habit completion",
            example = "Completed morning meditation for 15 minutes instead of the usual 10")
    private String notes;

    /** Timestamp when this completion entry was first created */
    @Schema(
            description = "Timestamp when this completion entry was first created",
            example = "2024-12-06T10:30:00",
            format = "date-time")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    /** Timestamp when this completion entry was last updated */
    @Schema(
            description = "Timestamp when this completion entry was last updated",
            example = "2024-12-06T15:45:00",
            format = "date-time")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
