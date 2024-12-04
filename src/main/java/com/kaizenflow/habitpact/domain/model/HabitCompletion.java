package com.kaizenflow.habitpact.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "habit_completions")
public class HabitCompletion {
    @Id
    private String id;

    @Indexed
    private String habitId;

    @Indexed
    private String userId;

    private LocalDate date;
    private boolean completed;
    private String notes;

    @CreatedDate
    private LocalDateTime createdAt;
}
