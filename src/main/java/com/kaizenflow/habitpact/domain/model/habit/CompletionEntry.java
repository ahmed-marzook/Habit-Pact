package com.kaizenflow.habitpact.domain.model.habit;

import java.time.LocalDateTime;

import com.kaizenflow.habitpact.domain.enums.HabitStatus;

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
public class CompletionEntry {
    /** Whether the habit was completed on this day */
    private HabitStatus status;

    /** Optional notes or comments about the habit completion */
    private String notes;

    /** Timestamp when this completion entry was first created */
    @Builder.Default private LocalDateTime createdAt = LocalDateTime.now();

    /** Timestamp when this completion entry was last updated */
    @Builder.Default private LocalDateTime updatedAt = LocalDateTime.now();
}
