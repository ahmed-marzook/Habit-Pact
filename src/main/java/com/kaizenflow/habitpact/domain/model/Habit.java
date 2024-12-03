package com.kaizenflow.habitpact.domain.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.kaizenflow.habitpact.domain.HabitFrequency;

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

    @Builder.Default private List<String> tags = new ArrayList<>();

    @Builder.Default private boolean archived = false;

    private Streak streak;

    @Builder.Default private Reminder reminder = new Reminder();

    @CreatedDate private LocalDateTime createdAt;

    @LastModifiedDate private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Frequency {
        private int times;
        private HabitFrequency period;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Streak {
        @Builder.Default private int current = 0;

        @Builder.Default private int longest = 0;

        private LocalDateTime lastCompletedAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Reminder {
        @Builder.Default private boolean enabled = false;
        private String time;
        private List<String> days;
    }
}
