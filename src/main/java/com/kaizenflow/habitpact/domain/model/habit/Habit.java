package com.kaizenflow.habitpact.domain.model.habit;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "habits")
public class Habit {
    @Id private String id;

    @Indexed private String userId;

    private String name;
    private String description;

    private Frequency frequency;

    @Builder.Default private boolean archived = false;

    // Current year embedded completions
    private Integer currentYear;

    @Builder.Default
    private CurrentYearCompletions currentYearCompletions = new CurrentYearCompletions();

    @CreatedDate private LocalDateTime createdAt;

    @LastModifiedDate private LocalDateTime updatedAt;

    @Version private Integer version;

    //    // Summary of historical data
    //    @Builder.Default private CompletionSummary completionSummary = new CompletionSummary();

    //    private Streak streak;

    //    @Builder.Default private Reminder reminder = new Reminder();

    //    @Builder.Default private List<String> tags = new ArrayList<>();

}
